import {memo, useCallback, useState} from "react";
import {Tooltip, TooltipContent, TooltipTrigger} from "@/components/ui/shadcn/tooltip.tsx";
import {Button, buttonVariants} from "@/components/ui/shadcn/button.tsx";
import {CheckIcon, CopyIcon, CopySlashIcon, FlagIcon, HeartIcon, Pencil, EyeOffIcon, Menu} from "lucide-react";
import {cn} from "@/lib/utils";
import {ButtonGroup} from "@/components/ui/shadcn/button-group.tsx";
import {FlagDialog} from "@/components/flagDialog/flagDialog.tsx";
import {NotesDialog} from "@/components/notesDialog/notesDialog.tsx";
import type {Venue} from "@/lib/model/venue.ts";
import Rating from "@/components/ui/shadcn/rating.tsx";
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
} from "@/components/ui/shadcn/dropdown-menu.tsx";
import {HideDialog} from "@/components/hideDialog/hideDialog.tsx";
import { Trans, useLingui } from "@lingui/react/macro";

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
  const { t } = useLingui();

  const [flagDialogOpen, setFlagDialogOpen] = useState(false);
  const [notesDialogOpen, setNotesDialogOpen] = useState(false);
  const [hideConfirmOpen, setHideConfirmOpen] = useState(false);

  const copyLocationToClipboard = useCallback(() => {
    navigator.clipboard.writeText(venue.location.toString())
        .then(() => toast(t`Location copied to clipboard`))
  }, [venue.location]);

  const copyLifestreamToClipboard = useCallback(() => {
    navigator.clipboard.writeText("/li " + venue.location.toString())
        .then(() => toast(t`Lifestream command copied to clipboard`))
  }, [venue.location]);

  const openFlagDialog = useCallback(() => {
    setFlagDialogOpen(true);
    onDialogOpen?.call([])
  }, [setFlagDialogOpen]);

  const openNotesDialog = useCallback(() => {
    setNotesDialogOpen(true);
    onDialogOpen?.call([])
  }, [setNotesDialogOpen]);

  const handleConfirmHide = useCallback(() => {
    toggleHidden();
    toast(t`Venue hidden`, {
      action: { label: t`Undo`, onClick: toggleHidden}
    });
    setHideConfirmOpen(false);
  }, [toggleHidden]);

  const handleToggleHidden = useCallback(() => {
    if(hidden){
      toggleHidden();
    }
    else{
      setHideConfirmOpen(true);
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
    <HideDialog open={hideConfirmOpen} onOpenChange={setHideConfirmOpen} onConfirm={handleConfirmHide} dialogContainer={containerRef} />
  </div>
})

function VenueToolbarMobile(props: VenueToolbarActionsProps ) {
  const {favourited, visited, rating, hidden, note, container,
    onCopyLocation, onSetFavourited, onSetVisited, onSetRating,
    onToggleHidden, onOpenNotes, onOpenFlag} = props;
  const { t } = useLingui();

  return <div className="flex sm:hidden w-full justify-end items-center gap-2">
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger
          className={cn(buttonVariants({ variant: "secondary", size: "icon" }), "cursor-pointer")}
          aria-label={t`Venue actions`}>
        <Menu className="size-4"/>
      </DropdownMenuTrigger>
      <DropdownMenuPortal container={container ?? document.body}>
        <DropdownMenuContent align="end" className="w-52">

          <DropdownMenuItem className="cursor-pointer" onClick={onCopyLocation}>
            <CopyIcon className="size-4 mr-2"/>
            <Trans>Copy location</Trans>
          </DropdownMenuItem>

          <DropdownMenuSeparator/>

          <div className="flex justify-center py-1.5">
            <Rating onChange={onSetRating}
                    value={rating} maxStars={5} color="var(--color-primary)" iconSize={16}
                    className="flex items-center leading-none"
                    aria-label={t({ message: `Rating`, comment: `Star rating control` })}/>
          </div>
          <DropdownMenuItem className="cursor-pointer" onClick={() => onSetFavourited(!favourited)} aria-pressed={favourited}>
            <HeartIcon className={cn("size-4 mr-2", favourited && "fill-primary stroke-primary")}/>
            {favourited ? <Trans>Unfavourite</Trans> : <Trans>Favourite</Trans>}
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer" onClick={() => onSetVisited(!visited)} aria-pressed={visited}>
            <CheckIcon className={cn("size-4 mr-2", visited && "stroke-primary")} strokeWidth={3}/>
            {visited ? <Trans>Mark unvisited</Trans> : <Trans>Mark visited</Trans>}
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer" onClick={onOpenNotes} aria-pressed={!!note}>
            <Pencil className={cn("size-4 mr-2", !!note && "fill-primary stroke-primary")}/>
            {note ? <Trans>Edit note</Trans> : <Trans>Add note</Trans>}
          </DropdownMenuItem>

          <DropdownMenuSeparator/>

          <DropdownMenuItem className="cursor-pointer" onClick={onToggleHidden} aria-pressed={hidden}>
            <EyeOffIcon className={cn("size-4 mr-2", hidden && "stroke-primary")}/>
            {hidden ? <Trans>Unhide venue</Trans> : <Trans>Hide venue</Trans>}
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer" onClick={onOpenFlag}>
            <FlagIcon className="size-4 mr-2"/> <Trans>Flag venue</Trans>
          </DropdownMenuItem>

        </DropdownMenuContent>
      </DropdownMenuPortal>
    </DropdownMenu>
  </div>
}

type VenueToolbarDesktopProps = VenueToolbarActionsProps & {className?: string};
function VenueToolbarDesktop(props: VenueToolbarDesktopProps ) {
  const { favourited, visited, rating, hidden, note, onCopyLocation,
          onCopyLifestream, onSetFavourited, onSetVisited, onSetRating,
          onToggleHidden, onOpenNotes, onOpenFlag, className } = props;
  const { t } = useLingui();

  return <div className={cn("hidden sm:flex items-center justify-between w-full", className)}>
    <div className="flex gap-1">
      <ButtonGroup>
        <Tooltip>
          <TooltipTrigger onClick={onCopyLocation} render={(props) =>
              <Button size="icon" variant="secondary" className="cursor-pointer px-5 py-4" {...props} aria-label={t`Copy location`}>
                <CopyIcon className="size-4"/>
              </Button>}
          />
          <TooltipContent side="top" className="bg-muted text-muted-foreground"><Trans>Copy location</Trans></TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger onClick={onCopyLifestream} render={(props) =>
              <Button size="icon" variant="secondary" className="cursor-pointer px-5 py-4" {...props} aria-label={t`Copy lifestream command`}>
                <CopySlashIcon className="size-4"/>
              </Button>}
          />
          <TooltipContent side="top" className="bg-muted text-muted-foreground"><Trans>Copy lifestream command</Trans></TooltipContent>
        </Tooltip>
      </ButtonGroup>
    </div>

    <ButtonGroup className="gap-0.5">
      <Rating onChange={onSetRating}
              value={rating} maxStars={5} color="var(--color-primary)" iconSize={16}
              className="px-5 flex items-center leading-none"
              aria-label={t({ message: `Rating`, comment: `Star rating control` })}/>

      <Tooltip>
        <TooltipTrigger onClick={() => onSetFavourited(!favourited)} render={(props) =>
            <Button size="icon" variant="secondary" aria-label={t`Favourite`} aria-pressed={favourited}
                    className="group cursor-pointer px-5 py-4 aria-pressed:bg-primary aria-pressed:hover:bg-primary/75"
                    {...props}>
              <HeartIcon className="fill-secondary-foreground group-aria-pressed:fill-primary-foreground group-aria-pressed:stroke-primary-foreground size-4"/>
            </Button>}
        />
        <TooltipContent side="top" className="bg-muted text-muted-foreground">{favourited ? t`Unfavourite` : t`Favourite`}</TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger onClick={() => onSetVisited(!visited)} render={(props) =>
            <Button variant="secondary" size="icon" aria-label={t`Visited`} aria-pressed={visited}
                    className="group cursor-pointer px-5 py-4 aria-pressed:bg-primary aria-pressed:hover:bg-primary/75"
                    {...props}>
              <CheckIcon className="group-aria-pressed:stroke-primary-foreground size-4" strokeWidth={3}/>
            </Button>}
        />
        <TooltipContent side="top" className="bg-muted text-muted-foreground">{visited ? t`Mark unvisited` : t`Mark visited`}</TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger onClick={onOpenNotes} render={(props) =>
            <Button size="icon" variant="secondary"
                    className="group cursor-pointer px-5 py-4 aria-pressed:bg-primary aria-pressed:hover:bg-primary/75"
                    {...props} aria-label={t`Venue Notes`} aria-pressed={!!note}>
              <Pencil className="fill-secondary-foreground group-aria-pressed:fill-primary-foreground group-aria-pressed:stroke-primary-foreground size-4"/>
            </Button>}
        />
        <TooltipContent side="top" className="bg-muted text-muted-foreground">{note ? t`Edit note` : t`Add note`}</TooltipContent>
      </Tooltip>
    </ButtonGroup>

    <ButtonGroup>
      <Tooltip>
        <TooltipTrigger onClick={onToggleHidden} render={(props) =>
            <Button size="icon" variant="secondary"
                    className="group cursor-pointer px-5 py-4 aria-pressed:bg-primary aria-pressed:hover:bg-primary/75"
                    aria-label={t`Hide venue`} aria-pressed={hidden} {...props}>
              <EyeOffIcon className="group-aria-pressed:stroke-primary-foreground size-4"/>
            </Button>}
        />
        <TooltipContent side="top" className="bg-muted text-muted-foreground">{hidden ? t`Unhide venue` : t`Hide venue`}</TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger onClick={onOpenFlag} render={(props) =>
            <Button size="icon" variant="secondary" className="cursor-pointer px-5 py-4" {...props} aria-label={t`Flag venue`}>
              <FlagIcon className="size-4"/>
            </Button>}
        />
        <TooltipContent side="top" className="bg-muted text-muted-foreground"><Trans>Flag venue</Trans></TooltipContent>
      </Tooltip>
    </ButtonGroup>
  </div>
}

export default VenueToolbar