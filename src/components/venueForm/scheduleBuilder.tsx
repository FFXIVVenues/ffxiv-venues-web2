import {msg} from "@lingui/core/macro";
import type {IntervalDto} from "@/lib/services/venues/dtos/intervalDto.ts";
import {IntervalType} from "@/lib/model/intervalType.ts";
import type {MessageDescriptor} from "@lingui/core";
import {Day} from "@/lib/model/day.ts";
import type {TimeDto} from "@/lib/services/venues/dtos/timeDto.ts";
import {Trans, useLingui} from "@lingui/react/macro";
import {useState} from "react";
import {Field, FieldDescription, FieldLabel} from "@/components/ui/shadcn/field.tsx";
import {Selector} from "@/components/venueForm/selector.tsx";
import {SelectItem} from "@/components/ui/shadcn/select.tsx";
import {Button} from "@/components/ui/shadcn/button.tsx";
import {Plus, X} from "lucide-react";
import {Input} from "@/components/ui/shadcn/input.tsx";
import {timeZones} from "@/lib/model/venueOptions.ts";
import type {ScheduleDto} from "@/lib/services/venues/dtos/scheduleDto.ts";

const dayNames = [msg`Monday`, msg`Tuesday`, msg`Wednesday`, msg`Thursday`, msg`Friday`, msg`Saturday`, msg`Sunday`];
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
} satisfies Record<string, {label: MessageDescriptor; interval: IntervalDto}>;

type Repeat = keyof typeof repeats;
const needsStartDate = (repeat: Repeat) => {
    const {intervalType, intervalArgument} = repeats[repeat].interval;
    return intervalType === IntervalType.EveryXWeeks && intervalArgument > 1;
};

type Slot = {id: number; day: Day; open: string; close: string; repeat: Repeat; commencing: string};

let nextSlotId = 0;

const nextDate = (day: Day) => {
    const date = new Date();
    while ((date.getDay() + 6) % 7 !== day) date.setDate(date.getDate() + 1);
    return date;
};

const upcomingDates = (day: Day) => [0, 1, 2].map(week => {
    const date = nextDate(day);
    date.setDate(date.getDate() + week * 7);
    return date;
});

const toCalendarDate = (date: Date) => date.toLocaleDateString("en-CA");

const toClock = ({hour, minute}: {hour: number; minute: number}) =>
    `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;

const repeatFor = (interval: IntervalDto) => (Object.keys(repeats) as Repeat[]).find(key =>
    repeats[key].interval.intervalType === interval.intervalType
    && repeats[key].interval.intervalArgument === interval.intervalArgument);

const calendarDateIn = (instant: string, timeZone: string) => new Date(instant).toLocaleDateString("en-CA", {timeZone});
const weeksBetween = (from: string, to: string) => Math.round((Date.parse(to) - Date.parse(from)) / (7 * 86_400_000));

const nextOpeningDate = (commencing: string, timeZone: string, day: Day, everyWeeks: number) => {
    const stored = calendarDateIn(commencing, timeZone);
    const next = nextDate(day);
    if (stored > toCalendarDate(next)) return stored;
    const weeksSince = weeksBetween(stored, toCalendarDate(next));
    next.setDate(next.getDate() + ((everyWeeks - weeksSince % everyWeeks) % everyWeeks) * 7);
    return toCalendarDate(next);
};

const offsetOf = (date: Date, timeZone: string) => new Intl.DateTimeFormat("en-US", {timeZone, timeZoneName: "longOffset"}).format(date).split("GMT")[1] || "+00:00";

const midnightIn = (calendarDate: string, timeZone: string) => {
    const utcMidnight = new Date(`${calendarDate}T00:00:00Z`);
    const roughMidnight = new Date(`${calendarDate}T00:00:00${offsetOf(utcMidnight, timeZone)}`);
    return new Date(`${calendarDate}T00:00:00${offsetOf(roughMidnight, timeZone)}`).toISOString();
};

const toTime = (time: string, timeZone: string): Omit<TimeDto, "nextDay"> => ({
    hour: Number(time.slice(0, 2)),
    minute: Number(time.slice(3, 5)),
    timeZone,
});

const toSchedule = (slots: Slot[], timeZone: string) => slots.map(slot => ({
    day: slot.day,
    commencing: needsStartDate(slot.repeat) ? midnightIn(slot.commencing, timeZone) : undefined,
    start: toTime(slot.open, timeZone),
    end: toTime(slot.close, timeZone),
    interval: repeats[slot.repeat].interval,
}));

const toSlot = (schedule: ScheduleDto): Slot => {
    const repeat = repeatFor(schedule.interval) ?? "weekly";
    return {
        id: nextSlotId++,
        day: schedule.day,
        open: toClock(schedule.start),
        close: schedule.end ? toClock(schedule.end) : "",
        repeat,
        commencing: needsStartDate(repeat) && schedule.commencing
            ? nextOpeningDate(schedule.commencing, schedule.start.timeZone, schedule.day, repeats[repeat].interval.intervalArgument)
            : toCalendarDate(nextDate(schedule.day)),
    };
};

export const ScheduleBuilder = ({initialSchedule}: {initialSchedule?: ScheduleDto[]}) => {
    const {t, i18n} = useLingui();
    const browserTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const startZone = initialSchedule?.[0]?.start.timeZone ?? browserTimeZone;
    const [timeZone, setTimeZone] = useState<string | null>(startZone in timeZones ? startZone : null);
    const timeZoneLabels = Object.fromEntries(Object.entries(timeZones).map(([zone, label]) => [zone, i18n._(label)]));
    const [slots, setSlots] = useState(() => (initialSchedule ?? []).map(toSlot));

    const add = () => setSlots([...slots, {
        id: nextSlotId++,
        day: Day.Monday,
        open: "",
        close: "",
        repeat: "weekly",
        commencing: toCalendarDate(nextDate(Day.Monday)),
    }]);

    const update = (id: number, changes: Partial<Slot>) => setSlots(slots.map(slot => slot.id === id ? {...slot, ...changes} : slot));
    const remove = (id: number) => setSlots(slots.filter(slot => slot.id !== id));

    return <>
        <Field>
            <FieldLabel htmlFor="venue-timezone"><Trans>Time zone</Trans></FieldLabel>
            <Selector id="venue-timezone" items={timeZoneLabels} value={timeZone} onValueChange={setTimeZone} placeholder={t`Select`} required={slots.length > 0}>
                {Object.entries(timeZoneLabels).map(([zone, label]) => <SelectItem key={zone} value={zone}>{label}</SelectItem>)}
            </Selector>
            <FieldDescription><Trans>All your opening times are in this zone.</Trans></FieldDescription>
        </Field>

        {slots.length > 0 && <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)_auto] sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_auto_auto_auto] gap-2">
            <div aria-hidden="true" className="col-span-full hidden sm:grid grid-cols-subgrid px-2 text-sm font-medium">
                <span><Trans>Repeats</Trans></span>
                <span><Trans>Day</Trans></span>
                <span><Trans>Opens</Trans></span>
                <span><Trans>Closes</Trans></span>
            </div>
            {slots.map(slot => <SlotRow key={slot.id} slot={slot} onChange={changes => update(slot.id, changes)} onRemove={() => remove(slot.id)} />)}
        </div>}

        <Button type="button" variant="outline" size="sm" className="w-fit" onClick={add}>
            <Plus className="size-4" /> <Trans>Add time</Trans>
        </Button>

        <input type="hidden" name="schedule" value={JSON.stringify(toSchedule(slots, timeZone ?? "UTC"))} />
    </>;
};

const SlotRow = ({slot, onChange, onRemove}: {
    slot: Slot;
    onChange: (changes: Partial<Slot>) => void;
    onRemove: () => void;
}) => {
    const {t, i18n} = useLingui();
    const repeatLabels = Object.fromEntries(Object.entries(repeats).map(([key, {label}]) => [key, i18n._(label)]));
    const startDates = Object.fromEntries(upcomingDates(slot.day).map(date => [toCalendarDate(date), i18n.date(date, {weekday: "long", day: "numeric", month: "long"})]));
    const dayLabels = Object.fromEntries(dayNames.map((name, day) => [day, i18n._(name)]));
    const changeDay = (day: Day) => onChange({day, commencing: toCalendarDate(nextDate(day))});

    return <div className="col-span-full grid grid-cols-subgrid items-center gap-y-2 rounded-md bg-muted/40 p-2">
        <label htmlFor={`repeat-${slot.id}`} className="sr-only"><Trans>Repeats</Trans></label>
        <div className="max-sm:col-span-2 sm:contents">
            <Selector id={`repeat-${slot.id}`} items={repeatLabels} value={slot.repeat} onValueChange={v => onChange({repeat: v as Repeat})}>
                {Object.entries(repeatLabels).map(([key, label]) => <SelectItem key={key} value={key}>{label}</SelectItem>)}
            </Selector>
        </div>

        <label htmlFor={`day-${slot.id}`} className="sr-only"><Trans>Day</Trans></label>
        <div className="max-sm:col-span-2 sm:contents">
            <Selector id={`day-${slot.id}`} items={dayLabels} value={String(slot.day)} onValueChange={v => changeDay(Number(v))}>
                {Object.entries(dayLabels).map(([day, label]) => <SelectItem key={day} value={day}>{label}</SelectItem>)}
            </Selector>
        </div>

        <div className="col-span-full flex items-center gap-2 sm:contents">
            <label htmlFor={`open-${slot.id}`} className="sr-only"><Trans>Opens</Trans></label>
            <Input id={`open-${slot.id}`} type="time" required value={slot.open} className="sm:w-auto" onChange={e => onChange({open: e.target.value})} />
            <span aria-hidden="true" className="sm:hidden">–</span>
            <label htmlFor={`close-${slot.id}`} className="sr-only"><Trans>Closes</Trans></label>
            <Input id={`close-${slot.id}`} type="time" required value={slot.close} className="sm:w-auto" onChange={e => onChange({close: e.target.value})} />
        </div>

        <Button type="button" variant="ghost" size="icon" aria-label={t`Remove time`} onClick={onRemove} className="max-sm:col-start-3 max-sm:row-start-1">
            <X className="size-4" />
        </Button>

        {needsStartDate(slot.repeat) && <div className="col-span-full sm:col-span-4 flex items-center gap-2">
            <label htmlFor={`start-${slot.id}`} className="text-sm"><Trans>Starting</Trans></label>
            <Selector id={`start-${slot.id}`} items={startDates} value={slot.commencing} onValueChange={v => onChange({commencing: v ?? ""})}>
                {Object.entries(startDates).map(([iso, label]) => <SelectItem key={iso} value={iso}>{label}</SelectItem>)}
            </Selector>
        </div>}
    </div>;
};