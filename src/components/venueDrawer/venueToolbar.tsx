import {memo, useCallback, useState} from "react";
import {Tooltip, TooltipContent, TooltipTrigger} from "@/components/ui/tooltip.tsx";
import {Button} from "@/components/ui/button.tsx";
import {CheckIcon, CopyIcon, CopySlashIcon, HeartIcon} from "lucide-react";
import {cn} from "@/lib/utils";
import {ButtonGroup} from "@/components/ui/button-group.tsx";
import {favouritesService} from "@/lib/services/favouritesService.ts";
import {visitedService} from "@/lib/services/visitedService.ts";
import {ratingsService} from "@/lib/services/ratingsService.ts";
import type {Venue} from "@/lib/model/venue.ts";
import {ToggleGroup, ToggleGroupItem} from "@/components/ui/toggle-group.tsx";
import Rating from "@/components/ui/rating.tsx";

const VenueToolbar = memo(({venue, className }: { venue: Venue, className?: string }) => {
  const location = venue.location;
  const rating = ratingsService.getRating(venue.id);
  const [ internalRating, setInternalRating ] = useState(rating);
  const copyLocationToClipboard = useCallback(() =>
    navigator.clipboard.writeText(location.toString()), [location]);
  const copyLifestreamToClipboard = useCallback(() =>
    navigator.clipboard.writeText("/li " + location.toString()), [location]);

  return <div className="bg-muted/50 text-muted-foreground border-t border-b border-muted py-1.5 px-8 -mt-0.5 flex items-center justify-between">
    <div className={cn("flex gap-1", className)}>
      <ButtonGroup>
        <Tooltip>
          <TooltipTrigger onClick={copyLocationToClipboard} render={(props) =>
            <Button size="icon" variant="secondary" className="cursor-pointer" {...props}>
              <CopyIcon className="size-3.5"/>
            </Button>}
          />
          <TooltipContent side="top" className="bg-muted text-muted-foreground ">
            Copy location
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger onClick={copyLifestreamToClipboard} render={(props) =>
            <Button size="icon" variant="secondary" className="cursor-pointer" {...props}>
              <CopySlashIcon className="size-3.5"/>
            </Button>}
          />
          <TooltipContent side="right" className="bg-muted text-muted-foreground">
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
              className={cn("box-border h-8 px-3 flex items-center rounded-l-md hover:bg-muted/75", rating > 0 ? "bg-muted" : "")} />
      <ToggleGroupItem size="sm" value="favourite"
              className="group cursor-pointer w-fit pl-4! pr-3! gap-2 aria-pressed:bg-secondary text-secondary-foreground aria-pressed:hover:bg-secondary/75"
              onPressedChange={(on) => on ? favouritesService.setFavourite(venue.id) : favouritesService.removeFavourite(venue.id)}>
        <HeartIcon className="group-aria-pressed:fill-secondary-foreground group-aria-pressed:stroke-secondary-foreground mb-0.5" />
        Favorite
      </ToggleGroupItem>
      <ToggleGroupItem value="visited" size="sm"
              className="group cursor-pointer w-fit pl-3! pr-4! gap-2 aria-pressed:bg-secondary text-secondary-foreground aria-pressed:hover:bg-secondary/75"
              onPressedChange={(on) => on ? visitedService.setVisited(venue.id) : visitedService.removeVisited(venue.id)}>
        <CheckIcon className=" group-aria-pressed:stroke-secondary-foreground mb-0.5" strokeWidth={3}/>
        Visited
      </ToggleGroupItem>
    </ToggleGroup>
  </div>

})

export default VenueToolbar