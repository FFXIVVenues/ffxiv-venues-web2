import {msg} from "@lingui/core/macro";
import type {IntervalDto} from "@/lib/services/venues/dtos/intervalDto.ts";
import {IntervalType} from "@/lib/model/intervalType.ts";
import type {MessageDescriptor} from "@lingui/core";
import type {Day} from "@/lib/model/day.ts";
import type {TimeDto} from "@/lib/services/venues/dtos/timeDto.ts";
import type {ScheduleDto} from "@/lib/services/venues/dtos/scheduleDto.ts";
import {Trans, useLingui } from "@lingui/react/macro";
import {useState} from "react";
import {Field, FieldDescription, FieldLabel} from "@/components/ui/shadcn/field";
import {Selector} from "@/pages/createVenuePage/selector.tsx";
import {SelectItem} from "@/components/ui/shadcn/select.tsx";
import {Button} from "@/components/ui/shadcn/button.tsx";
import {Plus, X} from "lucide-react";
import { Input } from "@/components/ui/shadcn/input";

const dayNames = [msg`Monday`, msg`Tuesday`, msg`Wednesday`, msg`Thursday`, msg`Friday`, msg`Saturday`, msg`Sunday`];
const weeks = (n: number): IntervalDto => ({intervalType: IntervalType.EveryXWeeks, intervalArgument: n});
const monthly = (n: number): IntervalDto => ({intervalType: IntervalType.EveryXthDayOfTheMonth, intervalArgument: n});

const repeats = {
    "weekly": {label: msg`Weekly`, interval: weeks(1)},
    "biweekly": {label: msg`Every 2 weeks`, interval: weeks(2)},
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
type Slot = {id: string; day: Day; open: string; close: string; repeat: Repeat; commencing: string};

const nextTwoDates = (day: Day) => {
    const first = new Date();
    while ((first.getDay() + 6) % 7 !== day) first.setDate(first.getDate() + 1);
    const second = new Date(first);
    second.setDate(first.getDate() + 7);
    return [first, second] as const;
};

const toIsoDate = (date: Date) => new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())).toISOString();

const toTime = (hhmm: string, timeZone: string, nextDay: boolean): TimeDto =>
    ({hour: Number(hhmm.slice(0, 2)), minute: Number(hhmm.slice(3, 5)), timeZone, nextDay});

const toSchedule = (slots: Slot[], timeZone: string): ScheduleDto[] => slots.map(slot => ({
    day: slot.day,
    commencing: slot.repeat === "biweekly" ? slot.commencing : undefined,
    start: toTime(slot.open, timeZone, false),
    end: toTime(slot.close, timeZone, slot.close < slot.open),
    interval: repeats[slot.repeat].interval,
}));

export const ScheduleBuilder = () => {
    const {t, i18n} = useLingui();
    const [timeZone, setTimeZone] = useState<string | null>(Intl.DateTimeFormat().resolvedOptions().timeZone);
    const [slots, setSlots] = useState<Slot[]>([]);

    const add = (day: Day) => setSlots([...slots, {
        id: crypto.randomUUID(), day, open: "", close: "", repeat: "weekly",
        commencing: toIsoDate(nextTwoDates(day)[0]),
    }]);
    const update = (id: string, changes: Partial<Slot>) =>
        setSlots(slots.map(slot => slot.id === id ? {...slot, ...changes} : slot));
    const remove = (id: string) => setSlots(slots.filter(slot => slot.id !== id));

    return <>
        <Field>
            <FieldLabel htmlFor="venue-timezone"><Trans>Time zone</Trans></FieldLabel>
            <Selector id="venue-timezone" value={timeZone} onValueChange={setTimeZone} placeholder={t`Select`}>
                {Intl.supportedValuesOf("timeZone").map(tz => <SelectItem key={tz} value={tz}>{tz}</SelectItem>)}
            </Selector>
            <FieldDescription><Trans>All your opening times are in this zone.</Trans></FieldDescription>
        </Field>

        {dayNames.map((dayName, day) => {
            const daySlots = slots.filter(slot => slot.day === day);
            return <div key={day} className="rounded-lg border border-input p-3">
                <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{i18n._(dayName)}</span>
                    <Button type="button" variant="ghost" size="sm" onClick={() => add(day)}>
                        <Plus className="size-4" /> <Trans>Add time</Trans>
                    </Button>
                </div>
                {daySlots.length === 0
                    ? <p className="text-xs text-muted-foreground"><Trans comment="The venue is closed on this day">Closed</Trans></p>
                    : <div className="mt-3 flex flex-col gap-3">
                        {daySlots.map(slot => <SlotRow key={slot.id} slot={slot} onChange={changes => update(slot.id, changes)} onRemove={() => remove(slot.id)} />)}
                    </div>}
            </div>;
        })}

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
    const startDates = Object.fromEntries(nextTwoDates(slot.day).map(date =>
        [toIsoDate(date), i18n.date(date, {weekday: "long", day: "numeric", month: "long"})]));

    return <div className="flex flex-wrap items-end gap-3 rounded-md bg-muted/40 p-3">
        <Field className="min-w-28 flex-1">
            <FieldLabel htmlFor={`open-${slot.id}`}><Trans>Opens</Trans></FieldLabel>
            <Input id={`open-${slot.id}`} type="time" required value={slot.open}
                   onChange={e => onChange({open: e.target.value})} />
        </Field>
        <Field className="min-w-28 flex-1">
            <FieldLabel htmlFor={`close-${slot.id}`}><Trans>Closes</Trans></FieldLabel>
            <Input id={`close-${slot.id}`} type="time" required value={slot.close}
                   onChange={e => onChange({close: e.target.value})} />
        </Field>
        <Field className="min-w-40 flex-1">
            <FieldLabel htmlFor={`repeat-${slot.id}`}><Trans>Repeats</Trans></FieldLabel>
            <Selector id={`repeat-${slot.id}`} items={repeatLabels} value={slot.repeat}
                      onValueChange={v => onChange({repeat: v as Repeat})}>
                {Object.entries(repeatLabels).map(([key, label]) => <SelectItem key={key} value={key}>{label}</SelectItem>)}
            </Selector>
        </Field>
        {slot.repeat === "biweekly" && <Field className="min-w-48 flex-1">
            <FieldLabel htmlFor={`start-${slot.id}`}><Trans>Starting</Trans></FieldLabel>
            <Selector id={`start-${slot.id}`} items={startDates} value={slot.commencing}
                      onValueChange={v => onChange({commencing: v ?? ""})}>
                {Object.entries(startDates).map(([iso, label]) => <SelectItem key={iso} value={iso}>{label}</SelectItem>)}
            </Selector>
        </Field>}
        <Button type="button" variant="ghost" size="icon" aria-label={t`Remove time`} onClick={onRemove}>
            <X className="size-4" />
        </Button>
    </div>;
};