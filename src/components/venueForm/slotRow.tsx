import {Trans, useLingui} from "@lingui/react/macro";
import {X} from "lucide-react";
import {Button} from "@/components/ui/shadcn/button.tsx";
import {Input} from "@/components/ui/shadcn/input.tsx";
import {Selector} from "@/components/venueForm/selector.tsx";
import {toCalendarDate, upcomingDates} from "@/lib/utils/dates.ts";
import {dayNames, firstStartDate, needsStartDate, type Repeat, repeatLabels, type Slot} from "@/components/venueForm/scheduleSlots.ts";

export const SlotRow = ({slot, onChange, onRemove}: {
    slot: Slot;
    onChange: (changes: Partial<Slot>) => void;
    onRemove: () => void;
}) => {
    const {t, i18n} = useLingui();

    const setDay = (value: string | null) => {
        const day = Number(value);
        onChange({day, commencing: firstStartDate(day)});
    };

    const dateFormat = new Intl.DateTimeFormat(i18n.locale, {weekday: "long", day: "numeric", month: "long"});
    const startDates = Object.fromEntries(upcomingDates(slot.day).map(date => [toCalendarDate(date), dateFormat.format(date)]));

    return <div className="col-span-full grid grid-cols-subgrid items-center gap-y-2 rounded-md bg-muted/40 p-2">
        <Selector label={t`Repeats`} className="max-sm:col-span-2" options={repeatLabels} value={slot.repeat} onValueChange={v => onChange({repeat: v as Repeat})} />
        <Selector label={t`Day`} className="max-sm:col-span-2" options={dayNames} value={String(slot.day)} onValueChange={setDay} />

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
