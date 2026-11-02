import type {VenueDto} from "@/lib/services/venues2/dtos/venueDto.ts";

import React, {type ChangeEvent, memo, useCallback, useState} from 'react';
import {CalendarClock, CalendarX, DoorClosed, DoorOpen, Eye, Pen, Plus, Trash} from "lucide-react";
import {Trans} from "@lingui/react/macro";
import {Button} from "@/components/ui/shadcn/button.tsx";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/shadcn/card.tsx";
import {cn} from "@/lib/utils";
import defaultBanner from "@/assets/default-banner.webp";
import {Badge} from "@/components/ui/shadcn/badge.tsx";
import {LocationText} from "@/components/locationText/locationText.tsx";
import type {Location} from "@/lib/model/location.ts";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription,
  AlertDialogFooter, AlertDialogHeader, AlertDialogTitle
} from "@/components/ui/shadcn/alert-dialog.tsx";
import {Input} from "@/components/ui/shadcn/input.tsx";
import type {Nullable} from "@/lib/utils/nullable.ts";
import {Tooltip, TooltipContent, TooltipTrigger} from "@/components/ui/shadcn/tooltip.tsx";

type VenueManagementCardProps = {
  venue: VenueDto;
  className?: string;
  onEditClick: Nullable<(venue: VenueDto) => void>;
  onOpenClick: Nullable<(venue: VenueDto) => void>;
  onCloseClick: Nullable<(venue: VenueDto) => void>;
  onDeleteClick: Nullable<(venue: VenueDto) => void>;
}

export const VenueManagementCard = memo(({ venue, onEditClick, onOpenClick, onCloseClick, onDeleteClick, className }: VenueManagementCardProps) => {
  const [confirmDelete, setConfirmDelete] = useState<boolean>(false);
  const onEditClickCallback = useCallback(() => onEditClick && onEditClick(venue), [venue, onEditClick]);
  const onOpenClickCallback = useCallback(() => onOpenClick && onOpenClick(venue), [venue, onOpenClick]);
  const onCloseClickCallback = useCallback(() => onCloseClick && onCloseClick(venue), [venue, onCloseClick]);
  const onDeleteClickCallback = useCallback(() => setConfirmDelete(true), []);
  const onDeleteConfirmCallback = useCallback(() => {
    setConfirmDelete(false);
    onDeleteClick && onDeleteClick(venue);
  }, [venue, onDeleteClick]);
  const onDeleteConfirmCancel = useCallback(() => setConfirmDelete(false), []);

  // @ts-ignore
  return <>
    <Card className={cn("w-[350px] py-0 hover:bg-muted/50 transition-colors gap-5", className)}>
      <img src={venue.banner ?? defaultBanner} alt="" loading="lazy" className="aspect-2/1"/>
      <CardHeader>
        <div className="flex items-start justify-between gap-3">
          <CardTitle className="leading-tight line-clamp-1">{venue.name}</CardTitle>
        </div>
        <CardDescription>
          <LocationText className="line-clamp-1" location={venue.location as Location}/>
        </CardDescription>
      </CardHeader>
      <CardContent>
        {venue.approved
          ? <Badge variant="secondary" className={cn("font-bold relative -mt-0.5 bg-green-700", className)}>
            <Trans comment="Badge shown on newly-added venues">Approved</Trans>
          </Badge>
          : <Badge variant="secondary" className={cn("font-bold relative -mt-0.5 bg-yellow-700", className)}>
            <Trans comment="Badge shown on newly-added venues">Pending approval</Trans>
          </Badge>
        }
      </CardContent>
      <CardFooter className="p-4! border-t flex flex-col gap-2">
        <div className="flex gap-2">
          { onOpenClick &&
            <Tooltip>
              <TooltipTrigger onClick={onOpenClickCallback} render={(props) =>
                <Button variant="secondary" className="flex-1 cursor-pointer" {...props}>
                  <Eye /><span className="sr-only"><Trans comment="Refers to opening the venue">View venue</Trans></span>
                </Button> } />
              <TooltipContent side="top" className="bg-muted text-muted-foreground">
                <Trans>View venue</Trans>
              </TooltipContent>
            </Tooltip> }

          { onOpenClick &&
            <Tooltip>
              <TooltipTrigger onClick={onOpenClickCallback} render={(props) =>
                <Button variant="secondary" className="flex-1 cursor-pointer" {...props}>
                  <DoorOpen /><span className="sr-only"><Trans comment="Open as in Open the venue doors for visiting">Open venue</Trans></span>
                </Button> } />
              <TooltipContent side="top" className="bg-muted text-muted-foreground">
                <Trans>Open venue</Trans>
              </TooltipContent>
            </Tooltip> }

          { onCloseClick &&
            <Tooltip>
              <TooltipTrigger onClick={onCloseClickCallback} render={(props) =>
                <Button variant="secondary" className="flex-1 cursor-pointer" {...props}>
                  <DoorClosed /><span className="sr-only"><Trans comment="Close as in Close the venue doors - no longer open for service">Close venue</Trans></span>
                </Button> } />
              <TooltipContent side="top" className="bg-muted text-muted-foreground">
                <Trans>Close venue</Trans>
              </TooltipContent>
            </Tooltip> }

          { onEditClick &&
            <Tooltip>
              <TooltipTrigger onClick={onEditClickCallback} render={(props) =>
                <Button variant="secondary" className="flex-1 cursor-pointer" {...props}>
                  <Pen /><span className="sr-only"><Trans>Edit venue</Trans></span>
                </Button> } />
              <TooltipContent side="top" className="bg-muted text-muted-foreground">
                <Trans>Edit venue</Trans>
              </TooltipContent>
            </Tooltip> }

          { onDeleteClick &&
            <Tooltip>
              <TooltipTrigger onClick={onDeleteClickCallback} render={(props) =>
                <Button variant="secondary" className="flex-1 cursor-pointer" {...props}>
                  <Trash /><span className="sr-only"><Trans>Delete venue</Trans></span>
                </Button> } />
              <TooltipContent side="top" className="bg-muted text-muted-foreground">
                <Trans>Delete venue</Trans>
              </TooltipContent>
            </Tooltip> }
        </div>
      </CardFooter>
    </Card>

    <DeleteConfirmationAlert show={confirmDelete} targetType={"venue"} targetName={venue.name}
                             onConfirmClick={onDeleteConfirmCallback} onCancelClick={onDeleteConfirmCancel}/>
  </>
})


type DeleteConfirmationAlertProps = {
  show: boolean;
  targetType: string;
  targetName: string;
  onConfirmClick: () => void;
  onCancelClick: () => void;
}

const DeleteConfirmationAlert = memo(({ show, targetType, targetName, onConfirmClick, onCancelClick }: DeleteConfirmationAlertProps) => {
  const [input, setInput] = useState<string>('');
  const inputCallback = useCallback((e: ChangeEvent<HTMLInputElement>) => setInput(e.target.value), []);

  const confirmed = input.toLowerCase().trim() == targetName.toLowerCase();

  return <AlertDialog open={show}>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle><Trans>Delete <strong>{targetName}</strong>?</Trans></AlertDialogTitle>
        <AlertDialogDescription className="mt-2">
          <Trans>
            Are you absolutely sure you wish to delete the {targetType} {targetName}? <br/>
            This will delete it from the site and your management panel. <br/>
            To confirm and continue, enter the name of the {targetType} below.
          </Trans>
          <Input className="mt-3" onChange={inputCallback} placeholder={targetName}/>
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogAction variant="destructive" onClick={onConfirmClick}
                           disabled={!confirmed}>Continue</AlertDialogAction>
        <AlertDialogCancel onClick={onCancelClick}>Cancel</AlertDialogCancel>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
})