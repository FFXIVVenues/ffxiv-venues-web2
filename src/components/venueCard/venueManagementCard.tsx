import type {VenueDto} from "@/lib/services/venues2/dtos/venueDto.ts";

import React, {type ChangeEvent, memo, useCallback, useState} from 'react';
import {CalendarClock, CalendarX, Plus, Trash} from "lucide-react";
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
  const onOpeningsClickCallback = useCallback(() => onOpenClick && onOpenClick(venue), [venue, onOpenClick]);
  const onClosuresClickCallback = useCallback(() => onCloseClick && onCloseClick(venue), [venue, onCloseClick]);
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
      <CardFooter className="pb-6 border-t flex flex-col gap-2">
        <div className="flex gap-2 w-full">
          { onOpenClick && <Button variant="secondary" className="flex-1 cursor-pointer"
                  onClick={onOpeningsClickCallback}><Trans>Open</Trans></Button> }
          { onCloseClick && <Button variant="secondary" className="flex-1 cursor-pointer"
                  onClick={onClosuresClickCallback}><Trans>Close</Trans></Button> }
          { onEditClick && <Button variant="secondary" className="flex-1 cursor-pointer"
                 onClick={onEditClickCallback}><Trans>Edit</Trans></Button> }
          { onDeleteClick && <Button variant="secondary" className="px-3 cursor-pointer"
                 onClick={onDeleteClickCallback}><Trash/><span className="sr-only"><Trans>Delete venue</Trans></span></Button>}
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