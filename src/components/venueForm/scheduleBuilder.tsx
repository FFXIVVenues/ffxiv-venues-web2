import {Trans, useLingui} from "@lingui/react/macro";
import {Plus, X} from "lucide-react";
import {Field, FieldDescription, FieldLabel} from "@/components/ui/shadcn/field.tsx";
import {Button} from "@/components/ui/shadcn/button.tsx";
import {Input} from "@/components/ui/shadcn/input.tsx";
import {Selector} from "@/components/venueForm/selector.tsx";
import {Day} from "@/lib/model/day.ts";
import {timeZones} from "@/lib/model/venueOptions.ts";
import {toCalendarDate, upcomingDates} from "@/lib/utils/dates.ts";
import {dayNames, firstStartDate, needsStartDate, newSlot, type Repeat, repeatLabels, type Slot} from "@/components/venueForm/scheduleSlots.ts";

export const ScheduleBuilder = ({slots, timeZone, onChange}: {
    slots: Slot[];
    timeZone: string | null;
    onChange: (changes: {slots?: Slot[]; timeZone?: string | null}) => void;
}) => {
    const {t} = useLingui();
    const setSlots = (slots: Slot[]) => onChange({slots});

    const add = () => setSlots([...slots, newSlot(Day.Monday)]);
    const update = (id: number, changes: Partial<Slot>) => setSlots(slots.map(slot => slot.id === id ? {...slot, ...changes} : slot));
    const remove = (id: number) => setSlots(slots.filter(slot => slot.id !== id));

    return <>
        <Field>
            <FieldLabel htmlFor="venue-timezone"><Trans>Time zone</Trans></FieldLabel>
            <Selector id="venue-timezone" options={timeZones} value={timeZone} onValueChange={timeZone => onChange({timeZone})} placeholder={t`Select`} required={slots.length > 0} />
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
    </>;
};

const SlotRow = ({slot, onChange, onRemove}: {
    slot: Slot;
    onChange: (changes: Partial<Slot>) => void;
    onRemove: () => void;
}) => {
    const {t, i18n} = useLingui();
    const startDates = Object.fromEntries(upcomingDates(slot.day).map(date => [toCalendarDate(date), i18n.date(date, {weekday: "long", day: "numeric", month: "long"})]));

    return <div className="col-span-full grid grid-cols-subgrid items-center gap-y-2 rounded-md bg-muted/40 p-2">
        <Selector label={t`Repeats`} className="max-sm:col-span-2" options={repeatLabels} value={slot.repeat} onValueChange={v => onChange({repeat: v as Repeat})} />
        <Selector label={t`Day`} className="max-sm:col-span-2" options={dayNames} value={String(slot.day)} onValueChange={v => onChange({day: Number(v), commencing: firstStartDate(Number(v))})} />

        <div className="col-span-full flex items-center gap-2 sm:contents">
            <Input aria-label={t`Opens`} type="time" required value={slot.open} className="sm:w-auto" onChange={e => onChange({open: e.target.value})} />
            <span aria-hidden="true" className="sm:hidden">–</span>
            <Input aria-label={t`Closes`} type="time" required value={slot.close} className="sm:w-auto" onChange={e => onChange({close: e.target.value})} />
        </div>

        <Button type="button" variant="ghost" size="icon" aria-label={t`Remove time`} onClick={onRemove} className="max-sm:col-start-3 max-sm:row-start-1">
            <X className="size-4" />
        </Button>

        {needsStartDate(slot.repeat) && <div className="col-span-full sm:col-span-4 flex items-center gap-2">
            <label htmlFor={`start-${slot.id}`} className="text-sm"><Trans>Starting</Trans></label>
            <Selector id={`start-${slot.id}`} options={startDates} value={slot.commencing} onValueChange={v => onChange({commencing: v ?? ""})} />
        </div>}
    </div>;
};
