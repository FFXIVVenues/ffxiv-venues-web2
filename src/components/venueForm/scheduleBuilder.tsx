import {Trans, useLingui} from "@lingui/react/macro";
import {Plus} from "lucide-react";
import {Field, FieldDescription, FieldLabel} from "@/components/ui/shadcn/field.tsx";
import {Button} from "@/components/ui/shadcn/button.tsx";
import {Selector} from "@/components/venueForm/selector.tsx";
import {Day} from "@/lib/model/day.ts";
import {timeZones} from "@/lib/model/venueOptions.ts";
import {newSlot, type Slot, slotError} from "@/components/venueForm/scheduleSlots.ts";
import {SlotRow} from "@/components/venueForm/slotRow.tsx";

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
            {slots.map(slot => <SlotRow key={slot.id} slot={slot} error={slotError(slot, slots)} onChange={changes => update(slot.id, changes)} onRemove={() => remove(slot.id)} />)}
        </div>}

        <Button type="button" variant="outline" size="sm" className="w-fit" onClick={add}>
            <Plus className="size-4" /> <Trans>Add time</Trans>
        </Button>
    </>;
};
