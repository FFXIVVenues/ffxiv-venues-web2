import {msg} from "@lingui/core/macro";
import type {MessageDescriptor} from "@lingui/core";
import {Day} from "@/lib/model/day.ts";
import type {ScheduleDto} from "@/lib/services/venues2/dtos/scheduleDto.ts";
import {midnightIn, nextDate, nextOpeningDate, toCalendarDate} from "@/lib/utils/dates.ts";

export const dayNames: Record<Day, MessageDescriptor> = {
    [Day.Monday]: msg`Monday`, [Day.Tuesday]: msg`Tuesday`, [Day.Wednesday]: msg`Wednesday`, [Day.Thursday]: msg`Thursday`,
    [Day.Friday]: msg`Friday`, [Day.Saturday]: msg`Saturday`, [Day.Sunday]: msg`Sunday`,
};

type Interval = Pick<ScheduleDto, "intervalType" | "intervalArgument">;
const weeks = (n: number): Interval => ({intervalType: "EveryXWeeks", intervalArgument: n});
const monthly = (n: number): Interval => ({intervalType: "EveryXthDayOfTheMonth", intervalArgument: n});

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
    return intervalType === "EveryXWeeks" && intervalArgument > 1;
};

export type Slot = {id: number; day: Day; open: string; close: string; repeat: Repeat; commencing: string};

let nextSlotId = 0;

export const firstStartDate = (day: Day) => toCalendarDate(nextDate(day));

export const newSlot = (day: Day): Slot => ({id: nextSlotId++, day, open: "", close: "", repeat: "weekly", commencing: firstStartDate(day)});

const repeatFor = (schedule: ScheduleDto) => (Object.keys(repeats) as Repeat[]).find(key =>
    repeats[key].interval.intervalType === schedule.intervalType && repeats[key].interval.intervalArgument === schedule.intervalArgument);

const toClock = (hour: number, minute: number) => `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;

const toMinutes = (clock: string) => Number(clock.slice(0, 2)) * 60 + Number(clock.slice(3, 5));

const isSameSlot = (a: Slot, b: Slot) => a.day === b.day && a.repeat === b.repeat && a.open === b.open && a.close === b.close && (!needsStartDate(a.repeat) || a.commencing === b.commencing);

export const slotError = (slot: Slot, slots: Slot[]): MessageDescriptor | null => {
    if (!slot.open || !slot.close) return null;
    const length = (toMinutes(slot.close) - toMinutes(slot.open) + 1440) % 1440;
    if (length === 0) return msg`Opening and closing times can't be the same.`;
    if (length > 7 * 60) return msg`Aaaah, that's a long opening, max is 7 hours.`;
    if (slots.slice(0, slots.indexOf(slot)).some(other => isSameSlot(other, slot))) return msg`You've already added this time.`;
    return null;
};

export const toSlot = (schedule: ScheduleDto): Slot => {
    const day = Day[schedule.day];
    const slot = newSlot(day);
    const repeat = repeatFor(schedule) ?? "weekly";
    return {
        ...slot,
        open: toClock(schedule.startHour, schedule.startMinute),
        close: schedule.endHour === null ? "" : toClock(schedule.endHour, schedule.endMinute ?? 0),
        repeat,
        commencing: needsStartDate(repeat) && schedule.commencing
            ? nextOpeningDate(schedule.commencing, schedule.timeZone ?? "UTC", day, repeats[repeat].interval.intervalArgument)
            : slot.commencing,
    };
};

export const toSchedule = (slots: Slot[], timeZone: string): ScheduleDto[] => slots.map(slot => ({
    day: Day[slot.day] as keyof typeof Day,
    startHour: Number(slot.open.slice(0, 2)),
    startMinute: Number(slot.open.slice(3, 5)),
    endHour: Number(slot.close.slice(0, 2)),
    endMinute: Number(slot.close.slice(3, 5)),
    timeZone,
    ...repeats[slot.repeat].interval,
    commencing: needsStartDate(slot.repeat) ? midnightIn(slot.commencing, timeZone) : null,
}));