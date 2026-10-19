import type {VenueDto} from "@/lib/services/venues2/dtos/venueDto.ts";

import React, {type ChangeEvent, memo, useCallback, useState} from 'react';
import {NoUser, useUser} from "@/lib/services/user/useUser.ts";
import {useManagersVenues} from "@/lib/services/venues2/useManagersVenues.ts";
import {useNavigate} from "react-router";
import {DefaultPageLayout} from "@/pageLayouts/defaultPageLayout.tsx";
import {CalendarClock, CalendarX, Plus, Trash} from "lucide-react";
import {Trans} from "@lingui/react/macro";
import {Button} from "@/components/ui/shadcn/button.tsx";
import {deleteVenue} from "@/lib/services/venues2/deleteVenue.ts";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/shadcn/card.tsx";
import {cn} from "@/lib/utils";
import defaultBanner from "@/assets/default-banner.webp";
import {Badge} from "@/components/ui/shadcn/badge.tsx";
import {LocationText} from "@/components/locationText/locationText.tsx";
import type {Location} from "@/lib/model/location.ts";
import {AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription,
  AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/shadcn/alert-dialog.tsx";
import {Input} from "@/components/ui/shadcn/input.tsx";

export const ManageVenuesPage = memo(() => {
  const navigate = useNavigate();
  const user = useUser();
  const [ usersVenues, refreshUsersVenues ] = useManagersVenues(user?.userId);
  const onCreateClickCallback = useCallback(
    () => navigate(`/venue/create`), [navigate]);
  const onEditClickCallback = useCallback(
    (venue: VenueDto) => navigate(`/venue/${venue.id}/edit`), [navigate]);
  const onOpeningsClickCallback = useCallback(
    (venue: VenueDto) => navigate(`/venue/${venue.id}/openings`), [navigate]);
  const onClosuresClickCallback = useCallback(
    (_venue: VenueDto) => {}, []);
  const onDeleteClickCallback = useCallback(
    async (venue: VenueDto) => {
      await deleteVenue(venue.id);
      refreshUsersVenues();
    }, []);

  if (user === NoUser) {
    navigate(`/`);
  }

  return <DefaultPageLayout>
    <DefaultPageLayout.Panel>
      <Button variant="ghost" className="cursor-pointer w-full justify-start items-center gap-2 py-4" onClick={onCreateClickCallback}>
        <Plus className="size-4"/>
        <span className="mt-0.5"><Trans>Create venue</Trans></span>
      </Button>
    </DefaultPageLayout.Panel>
    <DefaultPageLayout.Page>
      {user === null
        ? <>Loading...</>
        : user === NoUser
        ? <>Not logged in...</>
        : usersVenues == null
        ? <>Fetching your venues...</>
        : usersVenues.length == 0
        ? <>You have no venues...</>
        : <div className="py-8 px-12">
            <div className="flex align-middle items-center justify-between mb-8">
              <img src={user.avatarUrl} alt="" className="rounded-full size-12 mr-6 flex-0"/>
              <h2 className="text-2xl flex-1">
                  <Trans>{user.nickname}'s venues</Trans>
              </h2>
              <Button className="px-3 py-4 hidden md:flex" variant="secondary" onClick={onCreateClickCallback}>
                <Plus /><Trans>Create venue</Trans>
              </Button>
            </div>
            <div className="flex flex-wrap gap-8 content-between flex-wrap align-middle justify-left">
              {usersVenues.map((venue) =>
                <ManagersVenueCard key={venue.id} venue={venue} onEditClick={onEditClickCallback} onOpeningsClick={onOpeningsClickCallback} onClosuresClick={onClosuresClickCallback} onDeleteClick={onDeleteClickCallback} />)}
              <Card className="w-[350px] aspect-7/8 flex flex-row items-center justify-center text-2xl text-muted-foreground cursor-pointer md:hidden" onClick={onCreateClickCallback}>
                <div className="flex flex-col align-middle items-center text-center">
                  <Plus className="size-12 mb-4" />
                  <Trans>Create venue</Trans>
                </div>
              </Card>
            </div>
          </div>
      }
    </DefaultPageLayout.Page>
  </DefaultPageLayout>
});


type ManagersVenueCardProps = {
  venue: VenueDto;
  className?: string;
  onEditClick: (venue: VenueDto) => void;
  onOpeningsClick: (venue: VenueDto) => void;
  onClosuresClick: (venue: VenueDto) => void;
  onDeleteClick: (venue: VenueDto) => void;
}

const ManagersVenueCard = memo(({ venue, onEditClick, onOpeningsClick, onClosuresClick, onDeleteClick, className } : ManagersVenueCardProps) => {
  const [ confirmDelete, setConfirmDelete ] = useState<boolean>(false);
  const onEditClickCallback = useCallback(() => onEditClick(venue), [venue, onEditClick]);
  const onOpeningsClickCallback = useCallback(() => onOpeningsClick(venue), [venue, onOpeningsClick]);
  const onClosuresClickCallback = useCallback(() => onClosuresClick(venue), [venue, onClosuresClick]);
  const onDeleteClickCallback = useCallback(() => setConfirmDelete(true), []);
  const onDeleteConfirmCallback = useCallback(() => { setConfirmDelete(false); onDeleteClick(venue); }, [venue, onDeleteClick]);
  const onDeleteConfirmCancel = useCallback(() => setConfirmDelete(false), []);

  // @ts-ignore
  return <>
      <Card className={cn("w-[350px] py-0 hover:bg-muted/50 transition-colors gap-5" , className)}>
        <img src={venue.banner ?? defaultBanner} alt="" loading="lazy" className="aspect-2/1"/>
        <CardHeader>
          <div className="flex items-start justify-between gap-3">
            <CardTitle className="leading-tight line-clamp-1">{venue.name}</CardTitle>
          </div>
          <CardDescription>
            <LocationText className="line-clamp-1" location={venue.location as Location} />
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
            <Button variant="default" className="flex-1 cursor-pointer" onClick={onOpeningsClickCallback}><CalendarClock /><Trans>Openings</Trans></Button>
            <Button variant="default" className="flex-1 cursor-pointer" onClick={onClosuresClickCallback}><CalendarX /><Trans>Closures</Trans></Button>
          </div>
          <div className="flex gap-2 w-full">
            <Button variant="default" className="flex-1 cursor-pointer" onClick={onEditClickCallback}><Trans>Edit Venue</Trans></Button>
            <Button variant="destructive" className="px-3 cursor-pointer" onClick={onDeleteClickCallback}><Trash  /><span className="sr-only"><Trans>Delete venue</Trans></span></Button>
          </div>
        </CardFooter>
      </Card>

      <DeleteConfirmationAlert show={confirmDelete} targetType={"venue"} targetName={venue.name} onConfirmClick={onDeleteConfirmCallback} onCancelClick={onDeleteConfirmCancel} />
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
  const [ input, setInput ] = useState<string>('');
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
          <Input className="mt-3" onChange={inputCallback} placeholder={targetName} />
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogAction variant="destructive" onClick={onConfirmClick} disabled={!confirmed}>Continue</AlertDialogAction>
        <AlertDialogCancel onClick={onCancelClick}>Cancel</AlertDialogCancel>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
})










