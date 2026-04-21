import {memo, useCallback, useState} from "react";
import {Tooltip, TooltipContent, TooltipTrigger} from "@/components/ui/tooltip.tsx";
import {Button, buttonVariants} from "@/components/ui/button.tsx";
import {CheckIcon, CopyIcon, CopySlashIcon, FlagIcon, HeartIcon, Pencil, EyeOffIcon, Menu} from "lucide-react";
import {cn} from "@/lib/utils";
import {ButtonGroup} from "@/components/ui/button-group.tsx";
import {FlagDialog} from "@/components/flagDialog/flagDialog.tsx";
import {NotesDialog} from "@/components/notesDialog/notesDialog.tsx";
import type {Venue} from "@/lib/model/venue.ts";
import Rating from "@/components/ui/rating.tsx";
import {toast} from "sonner";
import {useFavourite} from "@/lib/services/useFavourite.ts";
import {useVisited} from "@/lib/services/useVisited.ts";
import {useRating} from "@/lib/services/useRating.ts";
import {useNote} from "@/lib/services/notes/useNote.ts";
import {useHide} from "@/lib/services/hideVenue/useHide.ts";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem, DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu.tsx";

type VenueToolbarProps = {
  venue: Venue;
  className?: string;
  onDialogOpen?: () => void;
  container?: HTMLDivElement | null;
}

type VenueToolbarActionsProps = {
  favourited: boolean;
  visited: boolean;
  rating: number;
  hidden: boolean;
  note: string;
  container?: HTMLDivElement | null;
  onCopyLocation: () => void;
  onCopyLifestream: () => void;
  onSetFavourited: (value: boolean) => void;
  onSetVisited: (value: boolean) => void;
  onSetRating: (value: number) => void;
  onToggleHidden: () => void;
  onOpenNotes: () => void;
  onOpenFlag: () => void;
}

const VenueToolbar = memo(({ venue, className, onDialogOpen, container }: VenueToolbarProps) => {
  const [favourited, setFavourited] = useFavourite(venue.id);
  const [visited, setVisited] = useVisited(venue.id);
  const [rating, setRating] = useRating(venue.id);
  const [hidden, toggleHidden] = useHide(venue.id);
  const [note] = useNote(venue.id);
  const containerRef = { current: container } as React.RefObject<HTMLDivElement | null>;

  const [flagDialogOpen, setFlagDialogOpen] = useState(false);
  const [notesDialogOpen, setNotesDialogOpen] = useState(false);

  const copyLocationToClipboard = useCallback(() => {
    navigator.clipboard.writeText(venue.location.toString())
        .then(() => toast("Location copied to clipboard"))
  }, [venue.location]);

  const copyLifestreamToClipboard = useCallback(() => {
    navigator.clipboard.writeText("/li " + venue.location.toString())
        .then(() => toast("Lifestream command copied to clipboard"))
  }, [venue.location]);

  const openFlagDialog = useCallback(() => {
    setFlagDialogOpen(true);
    onDialogOpen?.call([])
  }, [setFlagDialogOpen]);

  const openNotesDialog = useCallback(() => {
    setNotesDialogOpen(true);
    onDialogOpen?.call([])
  }, [setNotesDialogOpen]);

  const handleToggleHidden = useCallback(() => {
    toggleHidden();
    if (!hidden) {
      toast("Venue hidden", {
        action: { label: "Undo", onClick: toggleHidden }
      });
    }
  }, [hidden, toggleHidden]);

  const actionsProps: VenueToolbarActionsProps = {
    favourited,
    visited,
    rating,
    hidden,
    note,
    container,
    onCopyLocation: copyLocationToClipboard,
    onCopyLifestream: copyLifestreamToClipboard,
    onSetFavourited: setFavourited,
    onSetVisited: setVisited,
    onSetRating: setRating,
    onToggleHidden: handleToggleHidden,
    onOpenNotes: openNotesDialog,
    onOpenFlag: openFlagDialog,
  };

  return <div className="bg-muted/50 text-muted-foreground border-t border-b border-muted py-1.5 px-2 sm:px-8 -mt-0.5 flex items-center justify-between">
    <VenueToolbarMobile {...actionsProps} />
    <VenueToolbarDesktop {...actionsProps} className={className} />
    <FlagDialog venue={venue} open={flagDialogOpen} onOpenChange={setFlagDialogOpen} dialogContainer={containerRef} />
    <NotesDialog venueId={venue.id} open={notesDialogOpen} onOpenChange={setNotesDialogOpen} dialogContainer={containerRef} />
  </div>
})

function VenueToolbarMobile({ favourited, visited, rating, hidden, note, container, onCopyLocation, onSetFavourited, onSetVisited, onSetRating, onToggleHidden, onOpenNotes, onOpenFlag }: VenueToolbarActionsProps) {
  return <div className="flex sm:hidden w-full justify-end items-center gap-2">
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger
          className={cn(buttonVariants({ variant: "secondary", size: "icon" }), "cursor-pointer")}
          aria-label="Venue actions">
        <Menu className="size-4"/>
      </DropdownMenuTrigger>
      <DropdownMenuPortal container={container ?? document.body}>
        <DropdownMenuContent align="end" className="w-52">

          <DropdownMenuItem className="cursor-pointer" onClick={onCopyLocation}>
            <CopyIcon className="size-4 mr-2"/>
            Copy location
          </DropdownMenuItem>

          <DropdownMenuSeparator/>

          <div className="flex justify-center py-1.5">
            <Rating onChange={onSetRating}
                    value={rating} maxStars={5} color="var(--color-primary)" iconSize={16}
                    className="flex items-center leading-none"
                    aria-label="Rating"/>
          </div>
          <DropdownMenuItem className="cursor-pointer" onClick={() => onSetFavourited(!favourited)} aria-pressed={favourited}>
            <HeartIcon className={cn("size-4 mr-2", favourited && "fill-primary stroke-primary")}/>
            {favourited ? "Unfavourite" : "Favourite"}
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer" onClick={() => onSetVisited(!visited)} aria-pressed={visited}>
            <CheckIcon className={cn("size-4 mr-2", visited && "stroke-primary")} strokeWidth={3}/>
            {visited ? "Mark unvisited" : "Mark visited"}
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer" onClick={onOpenNotes} aria-pressed={!!note}>
            <Pencil className={cn("size-4 mr-2", !!note && "fill-primary stroke-primary")}/>
            {note ? "Edit note" : "Add note"}
          </DropdownMenuItem>

          <DropdownMenuSeparator/>

          <DropdownMenuItem className="cursor-pointer" onClick={onToggleHidden} aria-pressed={hidden}>
            <EyeOffIcon className={cn("size-4 mr-2", hidden && "stroke-primary")}/>
            {hidden ? "Unhide venue" : "Hide venue"}
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer" onClick={onOpenFlag}>
            <FlagIcon className="size-4 mr-2"/> Flag venue
          </DropdownMenuItem>

        </DropdownMenuContent>
      </DropdownMenuPortal>
    </DropdownMenu>
  </div>
}

function VenueToolbarDesktop({ favourited, visited, rating, hidden, note, onCopyLocation, onCopyLifestream, onSetFavourited, onSetVisited, onSetRating, onToggleHidden, onOpenNotes, onOpenFlag, className }: VenueToolbarActionsProps & { className?: string }) {
  return <div className={cn("hidden sm:flex items-center justify-between w-full", className)}>
    <div className="flex gap-1">
      <ButtonGroup>
        <Tooltip>
          <TooltipTrigger onClick={onCopyLocation} render={(props) =>
              <Button size="icon" variant="secondary" className="cursor-pointer px-5 py-4" {...props} aria-label="Copy location">
                <CopyIcon className="size-4"/>
              </Button>}
          />
          <TooltipContent side="top" className="bg-muted text-muted-foreground">Copy location</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger onClick={onCopyLifestream} render={(props) =>
              <Button size="icon" variant="secondary" className="cursor-pointer px-5 py-4" {...props} aria-label="Copy lifestream command">
                <CopySlashIcon className="size-4"/>
              </Button>}
          />
          <TooltipContent side="top" className="bg-muted text-muted-foreground">Copy lifestream command</TooltipContent>
        </Tooltip>
      </ButtonGroup>
    </div>

    <ButtonGroup className="gap-0.5">
      <Rating onChange={onSetRating}
              value={rating} maxStars={5} color="var(--color-primary)" iconSize={16}
              className="px-5 flex items-center leading-none"
              aria-label="Rating"/>

      <Tooltip>
        <TooltipTrigger onClick={() => onSetFavourited(!favourited)} render={(props) =>
            <Button size="icon" variant="secondary" aria-label="Favourite" aria-pressed={favourited}
                    className="group cursor-pointer px-5 py-4 aria-pressed:bg-primary aria-pressed:hover:bg-primary/75"
                    {...props}>
              <HeartIcon className="fill-secondary-foreground group-aria-pressed:fill-primary-foreground group-aria-pressed:stroke-primary-foreground size-4"/>
            </Button>}
        />
        <TooltipContent side="top" className="bg-muted text-muted-foreground">Favourite</TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger onClick={() => onSetVisited(!visited)} render={(props) =>
            <Button variant="secondary" size="icon" aria-label="Visited" aria-pressed={visited}
                    className="group cursor-pointer px-5 py-4 aria-pressed:bg-primary aria-pressed:hover:bg-primary/75"
                    {...props}>
              <CheckIcon className="group-aria-pressed:stroke-primary-foreground size-4" strokeWidth={3}/>
            </Button>}
        />
        <TooltipContent side="top" className="bg-muted text-muted-foreground">Visited</TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger onClick={onOpenNotes} render={(props) =>
            <Button size="icon" variant="secondary"
                    className="group cursor-pointer px-5 py-4 aria-pressed:bg-primary aria-pressed:hover:bg-primary/75"
                    {...props} aria-label="Venue Notes" aria-pressed={!!note}>
              <Pencil className="fill-secondary-foreground group-aria-pressed:fill-primary-foreground group-aria-pressed:stroke-primary-foreground size-4"/>
            </Button>}
        />
        <TooltipContent side="top" className="bg-muted text-muted-foreground">Edit Note</TooltipContent>
      </Tooltip>
    </ButtonGroup>

    <ButtonGroup>
      <Tooltip>
        <TooltipTrigger onClick={onToggleHidden} render={(props) =>
            <Button size="icon" variant="secondary"
                    className="group cursor-pointer px-5 py-4 aria-pressed:bg-primary aria-pressed:hover:bg-primary/75"
                    aria-label="Hide Venue" aria-pressed={hidden} {...props}>
              <EyeOffIcon className="group-aria-pressed:stroke-primary-foreground size-4"/>
            </Button>}
        />
        <TooltipContent side="top" className="bg-muted text-muted-foreground">
          {hidden ? "Unhide Venue" : "Hide Venue"}
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger onClick={onOpenFlag} render={(props) =>
            <Button size="icon" variant="secondary" className="cursor-pointer px-5 py-4" {...props} aria-label="Flag Venue">
              <FlagIcon className="size-4"/>
            </Button>}
        />
        <TooltipContent side="top" className="bg-muted text-muted-foreground">Flag venue</TooltipContent>
      </Tooltip>
    </ButtonGroup>
  </div>
}

export default VenueToolbar