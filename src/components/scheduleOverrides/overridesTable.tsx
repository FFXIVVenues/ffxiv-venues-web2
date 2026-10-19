import {Trans, useLingui} from "@lingui/react/macro";
import {Trash} from "lucide-react";
import type {ScheduleOverrideDto} from "@/lib/services/venues2/dtos/scheduleOverrideDto.ts";
import {Button} from "@/components/ui/shadcn/button.tsx";
import {Table, TableBody, TableCell, TableRow} from "@/components/ui/shadcn/table.tsx";
import {dtf} from "@/lib/utils/dateFormat.ts";
import {TimeText} from "@/components/dateString/timeText.tsx";
import {Pulse} from "@/components/ui/pulse.tsx";

type OverridesTableProps = {
    overrides: ScheduleOverrideDto[];
    saving: boolean;
    onCancel: (target: ScheduleOverrideDto) => void;
}

export function OverridesTable({ overrides, saving, onCancel }: OverridesTableProps) {
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
                            <TableCell className="text-right">{dtf(i18n.locale, "dateFar").format(e)}</TableCell>
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
