import {memo, type RefObject, useCallback, useState} from "react";
import {Tooltip, TooltipContent, TooltipTrigger} from "@/components/ui/tooltip.tsx";
import {Button} from "@/components/ui/button.tsx";
import {CheckIcon, CopyIcon, CopySlashIcon, FlagIcon, HeartIcon} from "lucide-react";
import {cn} from "@/lib/utils";
import {ButtonGroup} from "@/components/ui/button-group.tsx";
import {FlagDialog} from "@/components/flagDialog/flagDialog.tsx";
import type {Venue} from "@/lib/model/venue.ts";
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
    navigator.clipboard.writeText(venue.location.toString())
        .then(() => toast("Location copied to clipboard"))
  }, [venue.location]);
  const copyLifestreamToClipboard = useCallback(() => {
    navigator.clipboard.writeText("/li " + venue.location.toString())
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

    <ButtonGroup className="gap-0.5">
      <Rating onChange={setRating}
              value={rating} maxStars={5} color="var(--color-primary)" iconSize={16}
              className="px-5 flex items-center leading-none"
              aria-label="Rating"/>

      <Button size="icon" variant="secondary" aria-label="Favourite" aria-pressed={favourited}
              className="group cursor-pointer px-5 py-4 aria-pressed:bg-primary aria-pressed:font-secondary-foreground aria-pressed:hover:bg-primary/75"
              onClick={() => setFavourited(!favourited)}>
        <HeartIcon className=" fill-secondary-foreground group-aria-pressed:fill-primary-foreground group-aria-pressed:stroke-primary-foreground size-4" />
      </Button>

      <Button variant="secondary" size="icon" aria-label="Visited" aria-pressed={visited}
              className="group cursor-pointer px-5 py-4 gap-2 aria-pressed:bg-primary aria-pressed:hover:bg-primary/75"
              onClick={() => setVisited(!visited)}>
        <CheckIcon className=" group-aria-pressed:stroke-primary-foreground size-4" strokeWidth={3}/>
      </Button>
    </ButtonGroup>

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