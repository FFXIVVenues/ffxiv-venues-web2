import type {VenueDto} from "@/lib/services/venues2/dtos/venueDto.ts";

import React, {memo, useCallback} from 'react';
import {NoUser, useUser} from "@/lib/services/useUser.ts";
import {useManagersVenues} from "@/lib/services/venues2/useManagersVenues.ts";
import {useNavigate} from "react-router";
import {DefaultPageLayout} from "@/pageLayoutss/defaultPageLayout.tsx";
import {Plus} from "lucide-react";
import {Trans} from "@lingui/react/macro";
import {Button} from "@/components/ui/shadcn/button.tsx";
import {deleteVenue} from "@/lib/services/venues2/deleteVenue.ts";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/shadcn/card.tsx";
import {cn} from "@/lib/utils";
import defaultBanner from "@/assets/default-banner.webp";
import {Badge} from "@/components/ui/shadcn/badge.tsx";
import {LocationText} from "@/components/locationText/locationText.tsx";
import type {Location} from "@/lib/model/location.ts";

export const ManageVenuesPage = memo(() => {
  const navigate = useNavigate();
  const user = useUser();
  const usersVenues = useManagersVenues(user?.userId);
  const onCreateClickCallback = useCallback(
    () => navigate(`/venue/create`), [navigate]);
  const onEditClickCallback = useCallback(
    (venue: VenueDto) => navigate(`/venue/${venue.id}/edit`), [navigate]);
  const onDeleteClickCallback = useCallback(
    (venue: VenueDto) => {
      deleteVenue(venue.id);
      // refresh list somehow
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
        : <div className="flex gap-8 content-between flex-wrap">
            {usersVenues.map((venue) =>
              <ManagersVenueCard key={venue.id}  venue={venue} onEditClick={onEditClickCallback} onDeleteClick={onDeleteClickCallback} />)}
          </div>
      }
    </DefaultPageLayout.Page>
  </DefaultPageLayout>
});


type ManagersVenueCardProps = {
  venue: VenueDto;
  className?: string;
  onEditClick: (venue: VenueDto) => void;
  onDeleteClick: (venue: VenueDto) => void;
}

const ManagersVenueCard = memo(({ venue, onEditClick, onDeleteClick, className } : ManagersVenueCardProps) => {
  const onEditClickCallback = useCallback(() => onEditClick(venue), [venue, onEditClick]);
  const onDeleteClickCallback = useCallback(() => onDeleteClick(venue), [venue, onDeleteClick]);

  // @ts-ignore
  return <Card className={cn("w-[350px] py-0 cursor-pointer hover:bg-muted/50 transition-colors gap-5" , className)}>
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
    <CardFooter className="pb-6 border-t flex gap-2">
      <Button variant="default" className="flex-1 cursor-pointer" onClick={onEditClickCallback}><Trans>Edit Venue</Trans></Button>
      <Button variant="destructive" className="px-4 cursor-pointer" onClick={onDeleteClickCallback}><Trans>Delete Venue</Trans></Button>
    </CardFooter>
  </Card>
})











