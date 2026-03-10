import {memo, useCallback} from "react";
import {Tooltip, TooltipContent, TooltipTrigger} from "@/components/ui/tooltip.tsx";
import {Button} from "@/components/ui/button.tsx";
import {CheckIcon, CopyIcon, CopySlashIcon, HeartIcon} from "lucide-react";
import {cn} from "@/lib/utils";
import {ButtonGroup} from "@/components/ui/button-group.tsx";
import {favouritesService} from "@/lib/services/favouritesService.ts";
import {visitedService} from "@/lib/services/visitedService.ts";
import {Toggle} from "@/components/ui/toggle.tsx";
import type {Venue} from "@/lib/model/venue.ts";
import {ToggleGroup, ToggleGroupItem} from "@/components/ui/toggle-group.tsx";

const VenueToolbar = memo(({venue, className }: { venue: Venue, className?: string }) => {
  const location = venue.location;
  const copyLocationToClipboard = useCallback(() =>
    navigator.clipboard.writeText(location.toString()), [location]);
  const copyLifestreamToClipboard = useCallback(() =>
    navigator.clipboard.writeText("/li " + location.toString()), [location]);

  return <div className="bg-muted/50 text-muted-foreground border-t border-b border-muted py-1.5 px-8 -mt-0.5 flex items-center justify-between">
    <div className={cn("flex gap-1", className)}>
      <ButtonGroup>
        <Tooltip>
          <TooltipTrigger render={(props) =>
            <Button size="icon" variant="secondary" className="cursor-pointer"
                    onClick={copyLocationToClipboard} {...props}>
              <CopyIcon className="size-3.5"/>
            </Button>}
          />
          <TooltipContent side="top" className="bg-muted text-muted-foreground ">
            Copy location
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger render={(props) =>
            <Button size="icon" variant="secondary" className="cursor-pointer"
                    onClick={copyLifestreamToClipboard} {...props}>
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
      <ToggleGroupItem size="sm" value="favourite"
              className="group cursor-pointer w-fit pl-4! pr-3! gap-2 aria-pressed:bg-secondary text-secondary-foreground aria-pressed:hover:bg-secondary/75"
              onPressedChange={(on) => on ? favouritesService.setFavourite(venue.id) : favouritesService.removeFavourite(venue.id)}>
        <HeartIcon className="group-aria-pressed:fill-accent group-aria-pressed:stroke-accent mb-0.5" />
        Favorite
      </ToggleGroupItem>
      <ToggleGroupItem value="visited" size="sm"
              className="group cursor-pointer w-fit pl-3! pr-4! gap-2 aria-pressed:bg-secondary text-secondary-foreground aria-pressed:hover:bg-secondary/75"
              onPressedChange={(on) => on ? visitedService.setVisited(venue.id) : visitedService.removeVisited(venue.id)}>
        <CheckIcon className=" group-aria-pressed:stroke-accent mb-0.5" />
        Visited
      </ToggleGroupItem>
    </ToggleGroup>
  </div>

})

export default VenueToolbar