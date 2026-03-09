import type {Nullable} from "@/lib/utils/nullable";
import type {Venue} from "@/lib/model/venue.ts";
import {LocationText} from "@/components/locationText/locationText.tsx";
import {Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle} from "@/components/ui/drawer.tsx";
import {HeartIcon, XIcon} from "lucide-react";
import VenueToolbar from "@/components/venueDrawer/venueToolbar.tsx";
import {VenueDescription} from "@/components/venueDrawer/venueDescription.tsx";
import {VenueNsfwText} from "@/components/venueDrawer/venueNsfwText.tsx";
import {VenueDiscordButton} from "@/components/venueDrawer/venueDiscordButton.tsx";
import {VenueWebsiteButton} from "@/components/venueDrawer/venueWebsiteButton.tsx";
import {VenueSchedule} from "@/components/venueDrawer/venueSchedule.tsx";
import {VenueTags} from "@/components/venueDrawer/venueTags.tsx";
import defaultBanner from "@/assets/default-banner.webp";
import {Toggle} from "@/components/ui/toggle.tsx";
import {favouritesService} from "@/lib/services/favouritesService.ts";
import {settingsService} from "@/lib/services/settings/settingsService";
import {cva} from "class-variance-authority";

type VenueSheetProps = {
  open: boolean,
  venue: Nullable<Venue>,
  onClose?: () => void
}

export const VenueDrawer = memo(({ open, venue, onClose }: VenueSheetProps)=> {
  if (!venue) return null;
  const positionSetting = settingsService.getSetting("drawerSide");
  const bannerStyle = cva(
    "w-full max-w-full",
    {
      variants: {
        side: {
          left: "rounded-tr-xl",
          right: "rounded-tl-xl",
        }
      },
      defaultVariants: {
        side: "right"
      },
    });
  const exitButtonStyle = cva(
    "absolute top-3 bg-background/25 p-1 rounded hover:bg-background/75 cursor-pointer",
    {
      variants: {
        side: {
          left: "left-4",
          right: "right-4",
        }
      },
      defaultVariants: {
        side: "right"
      },
    });

  return <Drawer open={open} onClose={onClose} direction={positionSetting}>
      <DrawerContent className="max-w-150">
          <DrawerHeader className="p-0">
            <DrawerClose className={exitButtonStyle({ side: positionSetting })}>
              <XIcon />
            </DrawerClose>
            <img className={bannerStyle({ side: positionSetting })} src={venue.bannerUri ?? defaultBanner } alt={venue.name} />
            <VenueToolbar venue={venue} />
            <DrawerTitle className="text-2xl mx-8 mt-4 mb-0">{venue.name}</DrawerTitle>
            <DrawerDescription className="text-muted-foreground text-md mx-8 mb-2">
              <LocationText location={venue.location} />
            </DrawerDescription>
          </DrawerHeader>
          <div className="mx-8 no-scrollbar overflow-y-auto">
            <VenueDescription description={venue.description} />
            <VenueTags tags={venue.tags} />
            <hr className="border-t border-dotted border-muted mt-8 "/>
            <VenueSchedule venue={venue} className="mt-8"/>
            <small className="text-muted-foreground italic ml-2 mt-4 inline-block">
                All times are in <em>your</em> timezone: <UtcOffset /> {Intl.DateTimeFormat().resolvedOptions().timeZone}
            </small>
            <VenueNsfwText className="mt-8" hasCourts={venue.tags.indexOf('Courtesans') >= 0} openlyNsfw={!venue.sfw} />
          </div>
          <DrawerFooter>
            <div className="flex justify-content-end gap-4 m-4">
              <VenueWebsiteButton website={venue.website} />
              <VenueDiscordButton discordLink={venue.discord} />
            </div>
          </DrawerFooter>
      </DrawerContent>
  </Drawer>
})

const UtcOffset = ({className}: {className?: string})=> {
    const offsetMinutes = -new Date().getTimezoneOffset(); // flip sign to match UTC±
    const sign = offsetMinutes >= 0 ? "+" : "-";
    const abs = Math.abs(offsetMinutes);
    const hh = String(Math.floor(abs / 60)).padStart(2, "0");
    const mm = String(abs % 60).padStart(2, "0");
    return <span className={className}>UTC{sign}{hh}:{mm}</span>
}



