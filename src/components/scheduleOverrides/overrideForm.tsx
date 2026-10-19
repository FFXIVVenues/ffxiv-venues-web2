import {useState, type SubmitEventHandler} from "react";
import {Trans, useLingui} from "@lingui/react/macro";
import type {ScheduleOverrideDto} from "@/lib/services/venues2/dtos/scheduleOverrideDto.ts";
import {Button} from "@/components/ui/shadcn/button.tsx";
import {Input} from "@/components/ui/shadcn/input.tsx";
import {Field, FieldError, FieldLabel} from "@/components/ui/shadcn/field.tsx";

const toLocalInput = (d: Date) => new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 16);
const hours = (n: number) => n * 60 * 60 * 1000;

type OverrideFormProps = {
    open: boolean;
    defaultHours: number;
    maxHours?: number;
    overrides: ScheduleOverrideDto[];
    saving: boolean;
    onAdd: (override: ScheduleOverrideDto) => Promise<boolean>;
}

export function OverrideForm({ open, defaultHours, maxHours, overrides, saving, onAdd }: OverrideFormProps) {
    const {t} = useLingui();
    const [start, setStart] = useState(() => toLocalInput(new Date()));
    const [end, setEnd] = useState(() => toLocalInput(new Date(Date.now() + hours(defaultHours))));

    const startDate = new Date(start);
    const endDate = new Date(end);
    const error = isNaN(startDate.getTime()) || isNaN(endDate.getTime()) ? t`Pick a start and an end.`
        : endDate <= startDate ? t`The end needs to be after the start.`
        : maxHours && endDate.getTime() - startDate.getTime() > hours(maxHours) ? t`Aaaah, that's a long opening, max is ${maxHours} hours.`
        : endDate <= new Date() ? t`That has already ended.`
        : overrides.some(o => startDate < new Date(o.end) && endDate > new Date(o.start)) ? t`That overlaps something you already have.`
        : null;

    const submit: SubmitEventHandler<HTMLFormElement> = async e => {
        e.preventDefault();
        if (error) return;
        if (!await onAdd({open, start: startDate.toISOString(), end: endDate.toISOString()})) return;
        setStart(end);
        setEnd(toLocalInput(new Date(endDate.getTime() + hours(defaultHours))));
    };

    return <form className="flex flex-col gap-4" onSubmit={submit}>
        <div className="flex flex-col sm:flex-row gap-4">
            <Field>
                <FieldLabel htmlFor="override-start"><Trans>Start</Trans></FieldLabel>
                <Input id="override-start" type="datetime-local" required value={start} onChange={e => setStart(e.target.value)} />
            </Field>
            <Field>
                <FieldLabel htmlFor="override-end"><Trans>End</Trans></FieldLabel>
                <Input id="override-end" type="datetime-local" required value={end} onChange={e => setEnd(e.target.value)} />
            </Field>
        </div>
        {error && <FieldError>{error}</FieldError>}
        <Button type="submit" className="self-end cursor-pointer" disabled={!!error || saving}><Trans>Save</Trans></Button>
    </form>;
}
