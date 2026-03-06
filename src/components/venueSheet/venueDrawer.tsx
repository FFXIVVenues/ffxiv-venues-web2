import type {Venue} from "@/lib/model/venue.ts";
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm'
import {LocationText} from "@/components/locationText/locationText.tsx";
import {Badge} from "@/components/ui/badge.tsx";
import {TimeText} from "@/components/dateString/timeText.tsx";
import {DateText} from "@/components/dateString/dateText.tsx";
import {Table, TableBody, TableCell, TableRow} from "@/components/ui/table.tsx";
import {RecurringDayText} from "@/components/dateString/recurringDayText.tsx";
import {Drawer, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle} from "@/components/ui/drawer.tsx";

type VenueSheetProps = {
    venue: Venue,
    onClose: () => void;
}

export const VenueDrawer = ({ venue, onClose }: VenueSheetProps) => {
    return (
        <Drawer defaultOpen={true} onClose={onClose} direction="right">
            <DrawerContent className="overflow-hidden data-[vaul-drawer-direction=right]:sm:max-w-xl">
                <DrawerHeader className="p-0">
                  <img className="w-full max-w-full mb-4" src={venue.bannerUri} alt={venue.name} />

                  {/*  Favourite  */}
                  {/*  Hide       */}
                  {/*  Visited    */}
                </DrawerHeader>
                <DrawerDescription className="px-4">
                  <DrawerTitle className="text-2xl">{venue.name}</DrawerTitle>
                  <LocationText className="text-muted-foreground text-md" location={venue.location} />
                    <br/>
                    {venue.discord}
                    <br/>
                    {venue.website}
                    <br/>
                    <NsfwText hasCourts={venue.tags.indexOf('Courtesans') >= 0} openlyNsfw={!venue.sfw} />

                    { venue.description && venue.description.length > 0 &&
                      <article className="">
                         <Markdown remarkPlugins={[remarkGfm]}>{venue.description.join("\n\n")}</Markdown>
                      </article>
                    }
                    <br/>

                    <Schedule venue={venue} />

                    {venue.tags && venue.tags.length &&
                      venue.tags.map((tag, i) =>
                        <Badge variant="secondary" key={i}>{tag}</Badge>
                    )}
                </DrawerDescription>
                <DrawerFooter>
                      <small className="text-right italic">
                          All times are in <em>your</em> timezone: <UtcOffset /> {Intl.DateTimeFormat().resolvedOptions().timeZone}

                      </small>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
}

const NsfwText = ({hasCourts, openlyNsfw}: {hasCourts: boolean, openlyNsfw: boolean}) =>
  <>

        { hasCourts && openlyNsfw &&
          <><strong>Warning:</strong> This venue has indicated they are openly NSFW and offer adult services. You must not visit this venue if you are under 18 years of age or the legal age of consent in your country, and by visiting you declare you are not. Be prepared to verify your age.</>
        }
        { hasCourts && !openlyNsfw &&
          <><strong>Warning:</strong> This venue has indicated they offer adult services. You must not partake in these services if you are under 18 years of age or the legal age of consent in your country, and by partaking in these services you declare you are not. Be prepared to verify your age.</>
        }
        { !hasCourts && openlyNsfw &&
          <><strong>Warning:</strong> This venue has indicated they are openly NSFW. You must not visit this venue if you are under 18 years of age or the legal age of consent in your country, and by visiting you declare you are not. Be prepared to verify your age.</>
        }
    </>

const UtcOffset = ()=> {
    const offsetMinutes = -new Date().getTimezoneOffset(); // flip sign to match UTC±
    const sign = offsetMinutes >= 0 ? "+" : "-";
    const abs = Math.abs(offsetMinutes);
    const hh = String(Math.floor(abs / 60)).padStart(2, "0");
    const mm = String(abs % 60).padStart(2, "0");
    return <>UTC{sign}{hh}:{mm}</>;
}

const Schedule = ({ venue }: { venue: Venue }) => {
    return <>
        { venue.resolution?.isNow &&
            <>Open now until <TimeText time={venue.resolution?.end} /></>
        }
        { venue.resolution?.isNow === false &&
            <>Next open <DateText date={venue.resolution?.start} /> </>
        }

        { venue.scheduleOverrides.some(s =>  s.end > new Date()) &&
          <>
              <h2> Schedule { venue.schedule && <>Ammendments</>}</h2>
              <Table>
                <TableBody>
                  { venue.scheduleOverrides.filter(o => new Date() < o.end).map(o =>
                    <TableRow>
                        <TableCell className="w-full">{o.open ? 'Open' : 'Closed'}</TableCell>
                        <TableCell className="text-right w-fit"><DateText date={o.start} /></TableCell>
                        <TableCell className="text-right"><TimeText time={o.start} /></TableCell>
                        <TableCell className="w-4">-</TableCell>
                        <TableCell className=""><TimeText time={o.end} /></TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
          </>
        }

        { venue.schedule && <>
          <h2>Usual Schedule</h2>
          <Table>
            <TableBody>
            {venue.schedule.map(s => s.resolution &&
              <TableRow>
                <TableCell><RecurringDayText date={s.resolution.start} interval={s.interval} /></TableCell>
                <TableCell className="text-right w-fit"><TimeText time={s.resolution.start} /></TableCell>
                <TableCell className="w-4">-</TableCell>
                <TableCell className="left"><TimeText time={s.resolution.end} /></TableCell>
              </TableRow>
            )}
            </TableBody>
          </Table>
        </>}

    </>

}