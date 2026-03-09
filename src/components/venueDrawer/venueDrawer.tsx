import type { Nullable } from "@/lib/utils/nullable";
import type {Venue} from "@/lib/model/venue.ts";
import type {Location} from "@/lib/model/location.ts";
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm'
import {LocationText} from "@/components/locationText/locationText.tsx";
import {Badge} from "@/components/ui/badge.tsx";
import {TimeText} from "@/components/dateString/timeText.tsx";
import {DateText} from "@/components/dateString/dateText.tsx";
import {Table, TableBody, TableCell, TableRow} from "@/components/ui/table.tsx";
import {RecurringDayText} from "@/components/dateString/recurringDayText.tsx";
import {Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle} from "@/components/ui/drawer.tsx";
import {Button, buttonVariants} from "@/components/ui/button.tsx";
import {DiscordFillIcon} from "@/components/icons/akar-icons-discord-fill.tsx";
import {CopyIcon, LinkIcon, XIcon} from "lucide-react";
import {Tooltip, TooltipContent, TooltipTrigger} from "@/components/ui/tooltip.tsx";
import {memo, useCallback} from "react";
import {cn} from "@/lib/utils";

type VenueSheetProps = {
  open: boolean,
  venue: Nullable<Venue>,
  onClose?: () => void
}

export const VenueDrawer = memo(function VenueDrawer({ open, venue, onClose }: VenueSheetProps){
  if (!venue) return null;

  return (
        <Drawer open={open} onClose={onClose} direction="right">
            <DrawerContent className="overflow-hidden max-w-150">
                <DrawerHeader className="p-0">
                  <DrawerClose className="absolute right-4 top-3 bg-background/25 p-1 rounded hover:bg-background/75 cursor-pointer">
                    <XIcon />
                  </DrawerClose>
                  <img className="w-full max-w-full" src={venue.bannerUri} alt={venue.name} />
                  <DrawerTitle className="text-2xl m-8 mb-0">{venue.name}</DrawerTitle>
                  <DrawerDescription className="text-muted-foreground text-md mx-8 mb-2">
                    <LocationText location={venue.location} />
                  </DrawerDescription>
                </DrawerHeader>
                <div className="mx-8">
                    <CopyButtons location={venue.location} />
                    <Description description={venue.description} />
                    <Tags tags={venue.tags} />
                    <Schedule venue={venue} />
                </div>
                <DrawerFooter>
                  <div className="flex justify-content-end gap-4">
                    <WebsiteButton website={venue.website} />
                    <DiscordButton discordLink={venue.discord} />
                  </div>
                  <NsfwText hasCourts={venue.tags.indexOf('Courtesans') >= 0} openlyNsfw={!venue.sfw} />
                  <small className="text-right italic">
                      All times are in <em>your</em> timezone: <UtcOffset /> {Intl.DateTimeFormat().resolvedOptions().timeZone}
                  </small>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
});

const CopyButtons = ({ location }: { location: Location }) => {
  const copyLocationToClipboard = useCallback(() =>
    navigator.clipboard.writeText(location.toString()), [location]);
  const copyLifestreamToClipboard = useCallback(() =>
    navigator.clipboard.writeText("/li " + location.toString()), [location]);

  return <div className="flex gap-1">
    <Tooltip>
      <TooltipTrigger>
        <a className={cn(buttonVariants({ variant: "secondary", size: "sm" }),
                      "cursor-pointer size-7.5 bg-muted text-muted-foreground hover:bg-primary hover:text-primary-foreground")}
           onClick={copyLocationToClipboard}>
          <CopyIcon className="size-3.5"/>
        </a>
      </TooltipTrigger>
      <TooltipContent side="left" className="bg-muted text-muted-foreground">
        Copy location
      </TooltipContent>
    </Tooltip>

    <Tooltip>
      <TooltipTrigger>
        <a className={cn(buttonVariants({ variant: "secondary", size: "sm" }),
          "cursor-pointer size-7.5 bg-muted text-muted-foreground hover:bg-primary hover:text-primary-foreground")}
                onClick={copyLifestreamToClipboard}>
          <CopyIcon className="size-3.5"/>
        </a>
      </TooltipTrigger>
      <TooltipContent side="left" className="bg-muted text-muted-foreground">
        Copy lifestream command
      </TooltipContent>
    </Tooltip>
  </div>
}

const Description = ({ description }: { description: string[] }) =>
  description && description.length > 0 &&
    <article className="mt-8">
    <Markdown remarkPlugins={[remarkGfm]}>{description.join("\n\n")}</Markdown>
    </article>

const Tags = ({ tags } : { tags: string[] }) =>
  <div className="flex flex-wrap gap-2 my-8">
    {tags && tags.length &&
      tags.map((tag, i) =>
        <Badge variant="secondary" className="p-3 text-md rounded-sm" key={i}>{tag}</Badge>
      )}
  </div>

const Schedule = ({ venue }: { venue: Venue }) => {
  return <>
    { venue.resolution?.isNow &&
      <p className="font-bold px-3 py-2 bg-accent text-accent-foreground border rounded-md">Open now until <TimeText time={venue.resolution?.end} /></p> }
    { venue.resolution?.isNow === false &&
      <p className="font-bold px-3 py-2 bg-muted text-accent-foreground border rounded-md">Next open <DateText date={venue.resolution?.start} /></p> }

    { venue.scheduleOverrides.some(s =>  s.end > new Date()) &&
      <div className="mt-8">
        <h2 className="uppercase font-bold"> Schedule { venue.schedule && <>Ammendments</>}</h2>
        <Table className="mt-4">
          <TableBody>
            { venue.scheduleOverrides.filter(o => new Date() < o.end).map((o, i) =>
              <TableRow key={i}>
                <TableCell className="w-full">{o.open ? 'Open' : 'Closed'}</TableCell>
                <TableCell className="text-right w-fit"><DateText date={o.start} /></TableCell>
                <TableCell className="text-right"><TimeText time={o.start} /></TableCell>
                <TableCell className="w-4">-</TableCell>
                <TableCell className=""><TimeText time={o.end} /></TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    }

    { venue.schedule &&
      <div className="mt-8">
        <h2 className="uppercase font-bold">Usual Schedule</h2>
        <Table className="mt-4">
          <TableBody>
            {venue.schedule.map((s, i) => s.resolution &&
              <TableRow key={i}>
                <TableCell><RecurringDayText date={s.resolution.start} interval={s.interval} /></TableCell>
                <TableCell className="text-right w-fit"><TimeText time={s.resolution.start} /></TableCell>
                <TableCell className="w-4">-</TableCell>
                <TableCell className="left"><TimeText time={s.resolution.end} /></TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>}

  </>

}

const WebsiteButton = ({ website }: { website: Nullable<string> }) =>
  website &&
    <Button className="cursor-pointer h-10 px-4 grow">
      <a href={website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 font-bold!">
        <LinkIcon className="size-5" strokeWidth={3} stroke="black" /> Website
      </a>
    </Button>

const DiscordButton = ({ discordLink }: { discordLink: Nullable<string> }) =>
  discordLink &&
    <Button className="cursor-pointer h-10 px-4 grow">
      <a href={discordLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 font-bold!">
        <DiscordFillIcon className="size-5" stroke="var(--color-primary-foreground)" fill="var(--color-primary-foreground)" /> Discord
      </a>
    </Button>

const NsfwText = ({hasCourts, openlyNsfw}: {hasCourts: boolean, openlyNsfw: boolean}) =>
  <>
      { hasCourts && openlyNsfw &&
        <p className="py-3 px-4 bg-muted rounded-md my-2"><strong>Warning:</strong> This venue has indicated they are openly NSFW and offer adult services. You must not visit this venue if you are under 18 years of age or the legal age of consent in your country, and by visiting you declare you are not. Be prepared to verify your age.</p>
      }
      { hasCourts && !openlyNsfw &&
        <p className="py-3 px-4 bg-muted rounded-md my-2"><strong>Warning:</strong> This venue has indicated they offer adult services. You must not partake in these services if you are under 18 years of age or the legal age of consent in your country, and by partaking in these services you declare you are not. Be prepared to verify your age.</p>
      }
      { !hasCourts && openlyNsfw &&
        <p className="py-3 px-4 bg-muted rounded-md my-2"><strong>Warning:</strong> This venue has indicated they are openly NSFW. You must not visit this venue if you are under 18 years of age or the legal age of consent in your country, and by visiting you declare you are not. Be prepared to verify your age.</p>
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



