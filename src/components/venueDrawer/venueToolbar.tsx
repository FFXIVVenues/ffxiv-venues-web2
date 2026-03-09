import {useCallback} from "react";
import {Tooltip, TooltipContent, TooltipTrigger} from "@/components/ui/tooltip.tsx";
import {Button} from "@/components/ui/button.tsx";
import {CopyIcon, CopySlashIcon, HeartIcon} from "lucide-react";
import {cn} from "@/lib/utils";
import {ButtonGroup} from "@/components/ui/button-group.tsx";
import {favouritesService} from "@/lib/services/favouritesService.ts";
import {Toggle} from "@/components/ui/toggle.tsx";
import type {Venue} from "@/lib/model/venue.ts";

const VenueToolbar = ({venue, className }: { venue: Venue, className?: string }) => {
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

    <Toggle defaultPressed={favouritesService.isFavourite(venue.id)} size="sm" variant="default"
            className="group cursor-pointer w-fit px-4 gap-2 aria-pressed:bg-secondary text-secondary-foreground aria-pressed:hover:bg-secondary/75"
            onPressedChange={(on) => on ? favouritesService.setFavourite(venue.id) : favouritesService.removeFavourite(venue.id)}>
      <HeartIcon className="group-aria-pressed:fill-accent group-aria-pressed:stroke-accent mb-0.5" />
      Favorite
    </Toggle>
  </div>

}

export default VenueToolbar