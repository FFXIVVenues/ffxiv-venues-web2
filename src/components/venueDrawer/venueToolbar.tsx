import {memo, type Ref, type RefObject, useCallback, useState} from "react";
import {Tooltip, TooltipContent, TooltipTrigger} from "@/components/ui/tooltip.tsx";
import {Button} from "@/components/ui/button.tsx";
import {CheckIcon, CopyIcon, CopySlashIcon, FlagIcon, HeartIcon} from "lucide-react";
import {cn} from "@/lib/utils";
import {ButtonGroup} from "@/components/ui/button-group.tsx";
import {favouritesService} from "@/lib/services/favouritesService.ts";
import {visitedService} from "@/lib/services/visitedService.ts";
import {ratingsService} from "@/lib/services/ratingsService.ts";
import {FlagDialog} from "@/components/flagDialog/flagDialog.tsx";
import type {Venue} from "@/lib/model/venue.ts";
import {ToggleGroup, ToggleGroupItem} from "@/components/ui/toggle-group.tsx";
import Rating from "@/components/ui/rating.tsx";
import {toast} from "sonner";

type VenueToolbarProps = {
  venue: Venue;
  className?: string;
  onDialogOpen?: () => void;
  container?: RefObject<HTMLDivElement | null>;
}

const VenueToolbar = memo(({ venue, className, onDialogOpen, container }: VenueToolbarProps) => {
  const location = venue.location;
  const rating = ratingsService.getRating(venue.id);
  const [ internalRating, setInternalRating ] = useState(rating);
  const copyLocationToClipboard = useCallback(() => {
    navigator.clipboard.writeText(location.toString());
    toast("Location copied to clipboard");
  }, [location]);
  const copyLifestreamToClipboard = useCallback(() => {
    navigator.clipboard.writeText("/li " + location.toString())
    toast("Lifestream command copied to clipboard");
  }, [location]);
  const [ flagDialogOpen, setFlagDialogOpen ] = useState(false);
  const openFlagDialog = useCallback(() => { setFlagDialogOpen(true); onDialogOpen?.call([]) }, [setFlagDialogOpen]);

  return <div className="bg-muted/50 text-muted-foreground border-t border-b border-muted py-1.5 px-8 -mt-0.5 flex items-center justify-between">
    <div className={cn("flex gap-1", className)}>
      <ButtonGroup>
        <Tooltip>
          <TooltipTrigger onClick={copyLocationToClipboard} render={(props) =>
            <Button size="icon" variant="secondary" className="cursor-pointer px-5 py-4" {...props}>
              <CopyIcon className="size-4"/>
            </Button>}
          />
          <TooltipContent side="top" className="bg-muted text-muted-foreground ">
            Copy location
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger onClick={copyLifestreamToClipboard} render={(props) =>
            <Button size="icon" variant="secondary" className="cursor-pointer px-5 py-4" {...props}>
              <CopySlashIcon className="size-4"/>
            </Button>}
          />
          <TooltipContent side="top" className="bg-muted text-muted-foreground">
            Copy lifestream command
          </TooltipContent>
        </Tooltip>
      </ButtonGroup>
    </div>

    <ToggleGroup multiple className="gap-0.5" defaultValue={[
      favouritesService.isFavourite(venue.id) ? 'favourite' : '',
      visitedService.isVisited(venue.id) ? 'visited' : '',
    ]}>
      <Rating onChange={r => { ratingsService.setRating(venue.id, r); setInternalRating(r); }}
              value={internalRating} maxStars={5} color="var(--color-primary)" iconSize={14}
              className={cn("box-border h-8 px-3 flex items-center rounded-l-lg hover:bg-muted/75", rating > 0 ? "bg-muted" : "")} />

      <ToggleGroupItem size="sm" value="favourite"
                       className="group cursor-pointer w-fit px-3! gap-2 aria-pressed:bg-secondary text-secondary-foreground aria-pressed:hover:bg-secondary/75"
                       onPressedChange={(on) => on ? favouritesService.setFavourite(venue.id) : favouritesService.removeFavourite(venue.id)}>
        <HeartIcon className="group-aria-pressed:fill-secondary-foreground group-aria-pressed:stroke-secondary-foreground mb-0.5" />
      </ToggleGroupItem>

      <ToggleGroupItem value="visited" size="sm"
              className="group cursor-pointer w-fit px-3! gap-2 aria-pressed:bg-secondary text-secondary-foreground aria-pressed:hover:bg-secondary/75"
              onPressedChange={(on) => on ? visitedService.setVisited(venue.id) : visitedService.removeVisited(venue.id)}>
        <CheckIcon className=" group-aria-pressed:stroke-secondary-foreground mb-0.5" strokeWidth={3}/>
      </ToggleGroupItem>
    </ToggleGroup>

    <ButtonGroup>
      <Tooltip>
        <TooltipTrigger onClick={openFlagDialog} render={(props) =>
          <Button size="icon" variant="secondary" className="cursor-pointer px-5 py-4" {...props}>
            <FlagIcon className="size-4"/>
          </Button>}
        />
        <TooltipContent side="top" className="bg-muted text-muted-foreground">
          Flag venue
        </TooltipContent>
      </Tooltip>
    </ButtonGroup>

    <FlagDialog venue={venue} open={flagDialogOpen} onOpenChange={setFlagDialogOpen} dialogContainer={container}  />
  </div>

})

export default VenueToolbar