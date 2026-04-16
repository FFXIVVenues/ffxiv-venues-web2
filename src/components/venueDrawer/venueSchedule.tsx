import type {Venue} from "@/lib/model/venue.ts";
import {TimeText} from "@/components/dateString/timeText.tsx";
import {DateText} from "@/components/dateString/dateText.tsx";
import {Table, TableBody, TableCell, TableRow} from "@/components/ui/table.tsx";
import {RecurringDayText} from "@/components/dateString/recurringDayText.tsx";

export const VenueSchedule = ({venue, className}: { venue: Venue, className?: string }) => {
  return <div className={className}>
    {venue.resolution?.isNow &&
      <p className="font-bold px-3 py-2 bg-accent text-accent-foreground border rounded-md">Open now until <TimeText
        time={venue.resolution?.end}/></p>}
    {venue.resolution?.isNow === false &&
      <p className="font-bold px-2 ">Next open <DateText
        date={venue.resolution?.start}/> <TimeText time={venue.resolution?.start}/></p>}

    {venue.schedule && venue.schedule.length > 0 &&
      <div className="mt-2">
        {/*<h2 className="uppercase font-bold">Usual Schedule</h2>*/}
        <Table className="mt-4">
          <TableBody>
            {venue.schedule.map((s, i) => s.resolution &&
              <TableRow key={i}>
                <TableCell><RecurringDayText date={s.resolution.start} interval={s.interval}/></TableCell>
                <TableCell className="text-right w-fit"><TimeText time={s.resolution.start}/></TableCell>
                <TableCell className="w-4">-</TableCell>
                <TableCell className="text-left w-fit"><TimeText time={s.resolution.end}/></TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>}

    {venue.scheduleOverrides.some(s => s.end > new Date()) &&
      <div className="mt-8">
        <h2 className="uppercase font-bold"> Schedule {venue.schedule && <>Amendments</>}</h2>
        <Table className="mt-4">
          <TableBody>
            {venue.scheduleOverrides.filter(o => new Date() < o.end).map((o, i) =>
              <TableRow key={i}>
                <TableCell className="w-full">{o.open ? 'Open' : 'Closed'}</TableCell>
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