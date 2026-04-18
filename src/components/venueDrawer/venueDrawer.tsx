import type {Nullable} from "@/lib/utils/nullable";
import type {Venue} from "@/lib/model/venue.ts";
import {LocationText} from "@/components/locationText/locationText.tsx";
import {Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle} from "@/components/ui/drawer.tsx";
import {XIcon} from "lucide-react";
import VenueToolbar from "@/components/venueDrawer/venueToolbar.tsx";
import {VenueDescription} from "@/components/venueDrawer/venueDescription.tsx";
import {VenueNsfwText} from "@/components/venueDrawer/venueNsfwText.tsx";
import {VenueDiscordButton} from "@/components/venueDrawer/venueDiscordButton.tsx";
import {VenueWebsiteButton} from "@/components/venueDrawer/venueWebsiteButton.tsx";
import {VenueSchedule} from "@/components/venueDrawer/venueSchedule.tsx";
import {VenueTags} from "@/components/venueDrawer/venueTags.tsx";
import defaultBanner from "@/assets/default-banner.webp";
import {settingsService} from "@/lib/services/settings/settingsService";
import {cva} from "class-variance-authority";
import React, {memo, type RefObject, useRef} from "react";
import {CardTitle} from "@/components/ui/card.tsx";
import {PulseBadge} from "@/components/badges/pulseBadge.tsx";
import {cn} from "@/lib/utils";
import {OpenBadge} from "@/components/badges/openBadge.tsx";
import {NewBadge} from "@/components/badges/newBadge.tsx";

type VenueSheetProps = {
    open: boolean,
    venue: Nullable<Venue>,
    onClose?: () => void,
    onCloseComplete?: () => void
}

export const VenueDrawer = memo(({ open, venue, onClose, onCloseComplete }: VenueSheetProps)=> {
    const container: RefObject<HTMLDivElement | null> = useRef(null);
    const closeRef: RefObject<HTMLButtonElement | null> = useRef(null);

    if (!venue) return null;

  const positionSetting = settingsService.getSetting("drawerSide");
  const bannerStyle = cva(
    "w-full max-w-full drag-none",
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

  return <Drawer open={open} onClose={onClose} direction={positionSetting} modal={true}>
      <DrawerContent
          className="max-w-150"
          ref={container}
          onOpenAutoFocus={e => { e.preventDefault(); closeRef.current?.focus(); }}
          onCloseAutoFocus={e => { e.preventDefault(); onCloseComplete?.(); }}>
          <DrawerHeader className="p-0">
            <DrawerClose ref={closeRef} className={exitButtonStyle({ side: positionSetting })} aria-label="Close">
              <XIcon />
            </DrawerClose>
            <img className={bannerStyle({ side: positionSetting })} src={venue.bannerUri ?? defaultBanner } alt={venue.name} />
            <VenueToolbar venue={venue} container={container} />

            <div className="flex items-center justify-between gap-3 mt-4 mb-0 mx-8">
              <DrawerTitle className="text-2xl select-text!">
                {venue.name}
              </DrawerTitle>
              <div className="flex gap-2 h-min">
                {venue.isNew() && <NewBadge/>}
                {venue.resolution?.isNow && <OpenBadge/>}
              </div>
            </div>
            <address>
              <DrawerDescription>
                <LocationText location={venue.location} className="text-muted-foreground text-md mx-8 mb-2 select-text!" />
              </DrawerDescription>
            </address>
          </DrawerHeader>
          <div tabIndex={0} className="mx-8 no-scrollbar overflow-y-auto">
            <VenueDescription description={venue.description} />
            <VenueTags tags={venue.tags} className="my-8" />
            <VenueSchedule venue={venue} />
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
    const offsetMinutes = -new Date().getTimezoneOffset();
    const sign = offsetMinutes >= 0 ? "+" : "-";
    const abs = Math.abs(offsetMinutes);
    const hh = String(Math.floor(abs / 60)).padStart(2, "0");
    const mm = String(abs % 60).padStart(2, "0");
    return <span className={className}>UTC{sign}{hh}:{mm}</span>
}