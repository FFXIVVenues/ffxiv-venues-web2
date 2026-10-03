import {msg} from "@lingui/core/macro";
import type {MessageDescriptor} from "@lingui/core";
import {Day} from "@/lib/model/day.ts";
import {IntervalType} from "@/lib/model/intervalType.ts";
import type {IntervalDto} from "@/lib/services/venues/dtos/intervalDto.ts";
import type {TimeDto} from "@/lib/services/venues/dtos/timeDto.ts";
import type {ScheduleDto} from "@/lib/services/venues/dtos/scheduleDto.ts";
import {midnightIn, nextDate, nextOpeningDate, toCalendarDate} from "@/lib/utils/dates.ts";

export const dayNames: Record<Day, MessageDescriptor> = {
    [Day.Monday]: msg`Monday`, [Day.Tuesday]: msg`Tuesday`, [Day.Wednesday]: msg`Wednesday`, [Day.Thursday]: msg`Thursday`,
    [Day.Friday]: msg`Friday`, [Day.Saturday]: msg`Saturday`, [Day.Sunday]: msg`Sunday`,
};

const weeks = (n: number): IntervalDto => ({intervalType: IntervalType.EveryXWeeks, intervalArgument: n});
const monthly = (n: number): IntervalDto => ({intervalType: IntervalType.EveryXthDayOfTheMonth, intervalArgument: n});

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
    const {intervalType, intervalArgument} = repeats[repeat].interval;
    return intervalType === IntervalType.EveryXWeeks && intervalArgument > 1;
};

export type Slot = {id: number; day: Day; open: string; close: string; repeat: Repeat; commencing: string};

let nextSlotId = 0;

export const firstStartDate = (day: Day) => toCalendarDate(nextDate(day));

export const newSlot = (day: Day): Slot => ({id: nextSlotId++, day, open: "", close: "", repeat: "weekly", commencing: firstStartDate(day)});

const repeatFor = (interval: IntervalDto) => (Object.keys(repeats) as Repeat[]).find(key =>
    repeats[key].interval.intervalType === interval.intervalType && repeats[key].interval.intervalArgument === interval.intervalArgument);

const toClock = ({hour, minute}: {hour: number; minute: number}) => `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;

const toTime = (time: string, timeZone: string): Omit<TimeDto, "nextDay"> => ({hour: Number(time.slice(0, 2)), minute: Number(time.slice(3, 5)), timeZone});

export const toSlot = (schedule: ScheduleDto): Slot => {
    const slot = newSlot(schedule.day);
    const repeat = repeatFor(schedule.interval) ?? "weekly";
    return {
        ...slot,
        open: toClock(schedule.start),
        close: schedule.end ? toClock(schedule.end) : "",
        repeat,
        commencing: needsStartDate(repeat) && schedule.commencing
            ? nextOpeningDate(schedule.commencing, schedule.start.timeZone, schedule.day, repeats[repeat].interval.intervalArgument)
            : slot.commencing,
    };
};

export const toSchedule = (slots: Slot[], timeZone: string) => slots.map(slot => ({
    day: slot.day,
    commencing: needsStartDate(slot.repeat) ? midnightIn(slot.commencing, timeZone) : undefined,
    start: toTime(slot.open, timeZone),
    end: toTime(slot.close, timeZone),
    interval: repeats[slot.repeat].interval,
}));
