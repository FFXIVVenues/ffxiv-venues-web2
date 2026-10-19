import {Trans, useLingui} from "@lingui/react/macro";
import {useNavigate, useParams} from "react-router";
import {useEffect, useState, type SubmitEventHandler} from "react";
import {ArrowLeft, Trash} from "lucide-react";
import {toast} from "sonner";
import type {VenueDto} from "@/lib/services/venues2/dtos/venueDto.ts";
import type {ScheduleOverrideDto} from "@/lib/services/venues2/dtos/scheduleOverrideDto.ts";
import {getVenue} from "@/lib/services/venues2/getVenue.ts";
import {updateVenue} from "@/lib/services/venues2/updateVenue.ts";
import {NotFoundPage} from "@/pages/notFoundPage/notFoundPage.tsx";
import {DefaultPageLayout} from "@/pageLayouts/defaultPageLayout.tsx";
import {VeniHeader} from "@/components/venueForm/veniHeader.tsx";
import {LoginPrompt} from "@/components/venueForm/loginPrompt.tsx";
import {saveError} from "@/components/venueForm/saveError.ts";
import {NoUser, useUser} from "@/lib/services/user/useUser.ts";
import {Button} from "@/components/ui/shadcn/button.tsx";
import {Input} from "@/components/ui/shadcn/input.tsx";
import {Field, FieldError, FieldLabel} from "@/components/ui/shadcn/field.tsx";
import {Table, TableBody, TableCell, TableRow} from "@/components/ui/shadcn/table.tsx";
import {dtf} from "@/lib/utils/dateFormat.ts";
import {TimeText} from "@/components/dateString/timeText.tsx";
import {Pulse} from "@/components/ui/pulse.tsx";

const toLocalInput = (d: Date) => new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 16);
const hours = (n: number) => n * 60 * 60 * 1000;

export const VenueOpeningsPage = () => {
    const {t} = useLingui();
    const navigate = useNavigate();
    const {venueId = ""} = useParams();
    const user = useUser();
    const [venue, setVenue] = useState<VenueDto | "loading" | "missing">("loading");
    const [overrides, setOverrides] = useState<ScheduleOverrideDto[]>([]);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        setVenue("loading");
        getVenue(venueId)
            .then(loaded => {
                setVenue(loaded ?? "missing");
                setOverrides(loaded?.scheduleOverrides ?? []);
            })
            .catch(() => setVenue("missing"));
    }, [venueId]);

    if (venue === "missing") return <NotFoundPage />;

    const save = async (next: ScheduleOverrideDto[], success: string) => {
        setSaving(true);
        try {
            await updateVenue(venueId, {scheduleOverrides: next});
            setOverrides(next);
            toast.success(success);
            return true;
        } catch (e) {
            toast.error(saveError(e));
            return false;
        } finally {
            setSaving(false);
        }
    };

    const add = (opening: ScheduleOverrideDto) =>
        save([...overrides, opening], t`Saved! Your opening is live.`);

    const cancel = (target: ScheduleOverrideDto) =>
        save(overrides.filter(o => o.start !== target.start), t`Cancelled.`);

    return <DefaultPageLayout title={t`Openings`}>
        <DefaultPageLayout.Panel>
            <Button variant="ghost" className="cursor-pointer w-full justify-start items-center gap-2 py-4" onClick={() => navigate(`/venue/manage`)}>
                <ArrowLeft className="size-4"/>
                <span className="mt-0.5"><Trans>Back to my venues</Trans></span>
            </Button>
        </DefaultPageLayout.Panel>
        <DefaultPageLayout.Page>
            <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
                <VeniHeader title={<Trans>Opening up? <span aria-hidden="true">🎉</span></Trans>} subtitle={<Trans>Tell me when and I'll let everyone know</Trans>} />
                {user === null || venue === "loading"
                    ? <VenueOpeningsLoading />
                    : user === NoUser
                    ? <LoginPrompt />
                    : !venue.managers.includes(user.userId)
                    ? <VenueOpeningsNotManager />
                    : <>
                        <OpeningForm overrides={overrides} saving={saving} onAdd={add} />
                        <OpeningsTable overrides={overrides} saving={saving} onCancel={cancel} />
                    </>}
            </div>
        </DefaultPageLayout.Page>
    </DefaultPageLayout>;
};

function VenueOpeningsLoading() {
    return <p className="text-sm text-muted-foreground"><Trans>Fetching your venue...</Trans></p>;
}

function VenueOpeningsNotManager() {
    return <p className="text-muted-foreground"><Trans>You don't manage this venue, so I can't let you change its openings. If you think you should, ask one of its managers to add you.</Trans></p>;
}

function OpeningForm({ overrides, saving, onAdd }: { overrides: ScheduleOverrideDto[], saving: boolean, onAdd: (opening: ScheduleOverrideDto) => Promise<boolean> }) {
    const {t} = useLingui();
    const [start, setStart] = useState(() => toLocalInput(new Date()));
    const [end, setEnd] = useState(() => toLocalInput(new Date(Date.now() + hours(3))));

    const startDate = new Date(start);
    const endDate = new Date(end);
    const error = isNaN(startDate.getTime()) || isNaN(endDate.getTime()) ? t`Pick a start and an end.`
        : endDate <= startDate ? t`The end needs to be after the start.`
        : endDate.getTime() - startDate.getTime() > hours(7) ? t`Aaaah, that's a long opening, max is 7 hours.`
        : endDate <= new Date() ? t`That opening has already ended.`
        : overrides.some(o => startDate < new Date(o.end) && endDate > new Date(o.start)) ? t`That overlaps something you already have.`
        : null;

    const submit: SubmitEventHandler<HTMLFormElement> = async e => {
        e.preventDefault();
        if (error) return;
        if (!await onAdd({open: true, start: startDate.toISOString(), end: endDate.toISOString()})) return;
        setStart(end);
        setEnd(toLocalInput(new Date(endDate.getTime() + hours(3))));
    };

    return <form className="flex flex-col gap-4" onSubmit={submit}>
        <div className="flex flex-col sm:flex-row gap-4">
            <Field>
                <FieldLabel htmlFor="opening-start"><Trans>Start</Trans></FieldLabel>
                <Input id="opening-start" type="datetime-local" required value={start} onChange={e => setStart(e.target.value)} />
            </Field>
            <Field>
                <FieldLabel htmlFor="opening-end"><Trans>End</Trans></FieldLabel>
                <Input id="opening-end" type="datetime-local" required value={end} onChange={e => setEnd(e.target.value)} />
            </Field>
        </div>
        {error && <FieldError>{error}</FieldError>}
        <Button type="submit" className="self-end cursor-pointer" disabled={!!error || saving}><Trans>Save</Trans></Button>
    </form>;
}

function OpeningsTable({ overrides, saving, onCancel }: { overrides: ScheduleOverrideDto[], saving: boolean, onCancel: (target: ScheduleOverrideDto) => void }) {
    const {i18n} = useLingui();
    const now = new Date();
    const upcoming = overrides
        .filter(o => new Date(o.end) > now)
        .sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime());

    return <>
        <h2 className="uppercase font-bold mt-12 mb-4"><Trans>Openings and closures</Trans></h2>
        {upcoming.length === 0
            ? <p className="text-muted-foreground"><Trans>Nothing coming up.</Trans></p>
            : <Table>
                <TableBody>
                    {upcoming.map(o => {
                        const s = new Date(o.start);
                        const e = new Date(o.end);
                        const isNow = s <= now && now < e;
                        return <TableRow key={o.start} className={isNow ? "text-accent font-extrabold" : undefined}>
                            <TableCell className="w-full">
                                <span className="flex items-center">
                                    {isNow && <Pulse className="mr-3" color="bg-accent"/>}
                                    {o.open ? <Trans>Open</Trans> : <Trans>Closed</Trans>}
                                </span>
                            </TableCell>
                            <TableCell className="text-right">{dtf(i18n.locale, "dateFar").format(s)}</TableCell>
                            <TableCell className="text-right"><TimeText time={s}/></TableCell>
                            <TableCell className="w-4">-</TableCell>
                            <TableCell><TimeText time={e}/></TableCell>
                            <TableCell>
                                <Button variant="ghost" size="icon" className="cursor-pointer" disabled={saving} onClick={() => onCancel(o)}>
                                    <Trash /><span className="sr-only"><Trans>Cancel</Trans></span>
                                </Button>
                            </TableCell>
                        </TableRow>;
                    })}
                </TableBody>
            </Table>}
    </>;
}
