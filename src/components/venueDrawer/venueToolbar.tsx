import {memo, type RefObject, useCallback, useState} from "react";
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
import {useFavourite} from "@/lib/services/useFavourite.ts";
import {useVisited} from "@/lib/services/useVisited.ts";
import {useRating} from "@/lib/services/useRating.ts";

type VenueToolbarProps = {
  venue: Venue;
  className?: string;
  onDialogOpen?: () => void;
  container?: RefObject<HTMLDivElement | null>;
}

const VenueToolbar = memo(({ venue, className, onDialogOpen, container }: VenueToolbarProps) => {
  const [ favourited, setFavourited ] = useFavourite(venue.id);
  const [ visited, setVisited ] = useVisited(venue.id);
  const [ rating, setRating ] = useRating(venue.id);

  const copyLocationToClipboard = useCallback(() => {
    navigator.clipboard.writeText(location.toString())
      .then(() => toast("Location copied to clipboard"))
  }, [venue.location]);
  const copyLifestreamToClipboard = useCallback(() => {
    navigator.clipboard.writeText("/li " + location.toString())
      .then(() => toast("Lifestream command copied to clipboard"))
  }, [venue.location]);
  const [ flagDialogOpen, setFlagDialogOpen ] = useState(false);
  const openFlagDialog = useCallback(() => { setFlagDialogOpen(true); onDialogOpen?.call([]) }, [setFlagDialogOpen]);


  return <div className="bg-muted/50 text-muted-foreground border-t border-b border-muted py-1.5 px-8 -mt-0.5 flex items-center justify-between">
    <div className={cn("flex gap-1", className)}>
      <ButtonGroup>
        <Tooltip>
          <TooltipTrigger onClick={copyLocationToClipboard} render={(props) =>
            <Button size="icon" variant="secondary" className="cursor-pointer px-5 py-4" {...props} aria-label="Copy location">
              <CopyIcon className="size-4"/>
            </Button>}
          />
          <TooltipContent side="top" className="bg-muted text-muted-foreground ">
            Copy location
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger onClick={copyLifestreamToClipboard} render={(props) =>
            <Button size="icon" variant="secondary" className="cursor-pointer px-5 py-4" {...props} aria-label="Copy lifestream command">
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
      favourited ? 'favourite' : '',
      visited ? 'visited' : '',
    ]}>
      <Rating onChange={setRating}
              value={rating} maxStars={5} color="var(--color-primary)" iconSize={14}
              className={cn("box-border h-8 px-3 flex items-center rounded-l-lg hover:bg-muted/75", rating > 0 ? "bg-muted" : "")}
              aria-label="Rating"/>

      <ToggleGroupItem size="sm" value="favourite" aria-label="Favourite" aria-pressed={favouritesService.isFavourite(venue.id)}
                       className="group cursor-pointer w-fit px-3! gap-2 aria-pressed:bg-secondary text-secondary-foreground aria-pressed:hover:bg-secondary/75"
                       onPressedChange={setFavourited}>
        <HeartIcon className="group-aria-pressed:fill-secondary-foreground group-aria-pressed:stroke-secondary-foreground mb-0.5" />
      </ToggleGroupItem>

      <ToggleGroupItem value="visited" size="sm" aria-label="Visited" aria-pressed={visitedService.isVisited(venue.id)}
              className="group cursor-pointer w-fit px-3! gap-2 aria-pressed:bg-secondary text-secondary-foreground aria-pressed:hover:bg-secondary/75"
              onPressedChange={setVisited}>
        <CheckIcon className=" group-aria-pressed:stroke-secondary-foreground mb-0.5" strokeWidth={3}/>
      </ToggleGroupItem>
    </ToggleGroup>

    <ButtonGroup>
      <Tooltip>
        <TooltipTrigger onClick={openFlagDialog} render={(props) =>
          <Button size="icon" variant="secondary" className="cursor-pointer px-5 py-4" {...props} aria-label="Flag Venue">
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