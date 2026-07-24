import type {Venue} from "@/lib/model/venue.ts";
import {TimeText} from "@/components/dateString/timeText.tsx";
import {DateText} from "@/components/dateString/dateText.tsx";
import {Table, TableBody, TableCell, TableRow} from "@/components/ui/shadcn/table.tsx";
import {RecurringDayText} from "@/components/dateString/recurringDayText.tsx";
import {cn} from "@/lib/utils";
import {Pulse} from "@/components/ui/pulse.tsx";

export const VenueSchedule = ({venue, className}: { venue: Venue, className?: string }) => {
  return <div className={cn("font-bold", className)}>

    {venue.resolution?.isNow === true &&
      <div className="rounded-md mb-6 border px-3 py-2 text-accent font-extrabold flex items-center">
        <Pulse className="mr-3" color="bg-accent"/>
        Open now until <TimeText time={venue.resolution?.end}/>
      </div>}

    {venue.resolution?.isNow === false &&
      <div className="font-bold rounded-md mb-6 border px-3 py-2">Next open <DateText
        date={venue.resolution?.start}/> <TimeText time={venue.resolution?.start}/></div>}

    {venue.schedule && venue.schedule.length > 0 &&
      <div>
        <h2 className="uppercase font-bold mb-4">Schedule</h2>
        <Table>
          <TableBody>
            {venue.schedule.map((s, i) => s.resolution &&
              <TableRow key={i} className={s.resolution.isNow ? "text-accent font-extrabold" : undefined}>
                <TableCell className="w-full">
                  <span className="flex items-center">
                    { s.resolution.isNow && <Pulse className="mr-3" color="bg-accent"/>}
                    <RecurringDayText date={s.resolution.start} interval={s.interval}/>
                  </span>
                </TableCell>
                <TableCell className="text-right w-min"><TimeText time={s.resolution.start}/></TableCell>
                <TableCell className=" w-min">-</TableCell>
                <TableCell className="text-right w-min"><TimeText time={s.resolution.end}/></TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>}

    {venue.scheduleOverrides.some(s => s.end > new Date()) &&
      <div className="mt-6">
        <h2 className="uppercase font-bold mb-4"> Schedule {venue.schedule && <>Amendments</>}</h2>
        <Table>
          <TableBody>
            {venue.scheduleOverrides.filter(o => new Date() < o.end).map((o, i) =>
              <TableRow key={i} className={o.isNow ? "text-accent font-extrabold" : undefined}>
                <TableCell className="w-full">
                  <span className="flex items-center">
                    {o.isNow && <Pulse className="mr-3" color="bg-accent"/>}
                    {o.open ? 'Open' : 'Closed'}
                  </span>
                </TableCell>
                <TableCell className="text-right w-fit"><DateText date={o.start}/></TableCell>
                <TableCell className="text-right"><TimeText time={o.start}/></TableCell>
                <TableCell className="w-4">-</TableCell>
                <TableCell className=""><TimeText time={o.end}/></TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    }



  </div>

}