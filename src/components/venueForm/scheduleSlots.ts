import {msg} from "@lingui/core/macro";
import type {MessageDescriptor} from "@lingui/core";
import {Day} from "@/lib/model/day.ts";
import type {ScheduleDto} from "@/lib/services/venues2/dtos/scheduleDto.ts";
import {midnightIn, nextDate, nextOpeningDate, toCalendarDate} from "@/lib/utils/dates.ts";

export const dayNames: Record<Day, MessageDescriptor> = {
    [Day.Monday]: msg`Monday`, [Day.Tuesday]: msg`Tuesday`, [Day.Wednesday]: msg`Wednesday`, [Day.Thursday]: msg`Thursday`,
    [Day.Friday]: msg`Friday`, [Day.Saturday]: msg`Saturday`, [Day.Sunday]: msg`Sunday`,
};

type Interval = Pick<ScheduleDto, "IntervalType" | "IntervalArgument">;
const weeks = (n: number): Interval => ({IntervalType: "EveryXWeeks", IntervalArgument: n});
const monthly = (n: number): Interval => ({IntervalType: "EveryXthDayOfTheMonth", IntervalArgument: n});

const repeats = {
    "weekly": {label: msg`Weekly`, interval: weeks(1)},
    "biweekly": {label: msg`Every 2 weeks`, interval: weeks(2)},
    "triweekly": {label: msg`Every 3 weeks`, interval: weeks(3)},
    "1st": {label: msg`Monthly, 1st`, interval: monthly(1)},
    "2nd": {label: msg`Monthly, 2nd`, interval: monthly(2)},
    "3rd": {label: msg`Monthly, 3rd`, interval: monthly(3)},
    "4th": {label: msg`Monthly, 4th`, interval: monthly(4)},
    "last": {label: msg({message: `Monthly, last`, comment: `Last occurrence of a weekday in the month`}), interval: monthly(-1)},
    "2nd last": {label: msg`Monthly, 2nd last`, interval: monthly(-2)},
    "3rd last": {label: msg`Monthly, 3rd last`, interval: monthly(-3)},
    "4th last": {label: msg`Monthly, 4th last`, interval: monthly(-4)},
} as const;

export type Repeat = keyof typeof repeats;

export const repeatLabels = Object.fromEntries(Object.entries(repeats).map(([key, {label}]) => [key, label]));

export const needsStartDate = (repeat: Repeat) => {
    const {IntervalType, IntervalArgument} = repeats[repeat].interval;
    return IntervalType === "EveryXWeeks" && IntervalArgument > 1;
};

export type Slot = {id: number; day: Day; open: string; close: string; repeat: Repeat; commencing: string};

let nextSlotId = 0;

export const firstStartDate = (day: Day) => toCalendarDate(nextDate(day));

export const newSlot = (day: Day): Slot => ({id: nextSlotId++, day, open: "", close: "", repeat: "weekly", commencing: firstStartDate(day)});

const repeatFor = (schedule: ScheduleDto) => (Object.keys(repeats) as Repeat[]).find(key =>
    repeats[key].interval.IntervalType === schedule.IntervalType && repeats[key].interval.IntervalArgument === schedule.IntervalArgument);

const toClock = (hour: number, minute: number) => `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;

export const toSlot = (schedule: ScheduleDto): Slot => {
    const day = Day[schedule.Day];
    const slot = newSlot(day);
    const repeat = repeatFor(schedule) ?? "weekly";
    return {
        ...slot,
        open: toClock(schedule.StartHour, schedule.StartMinute),
        close: schedule.EndHour === null ? "" : toClock(schedule.EndHour, schedule.EndMinute ?? 0),
        repeat,
        commencing: needsStartDate(repeat) && schedule.Commencing
            ? nextOpeningDate(schedule.Commencing, schedule.TimeZone ?? "UTC", day, repeats[repeat].interval.IntervalArgument)
            : slot.commencing,
    };
};

export const toSchedule = (slots: Slot[], timeZone: string): ScheduleDto[] => slots.map(slot => ({
    Day: Day[slot.day] as keyof typeof Day,
    StartHour: Number(slot.open.slice(0, 2)),
    StartMinute: Number(slot.open.slice(3, 5)),
    EndHour: Number(slot.close.slice(0, 2)),
    EndMinute: Number(slot.close.slice(3, 5)),
    TimeZone: timeZone,
    ...repeats[slot.repeat].interval,
    Commencing: needsStartDate(slot.repeat) ? midnightIn(slot.commencing, timeZone) : null,
}));