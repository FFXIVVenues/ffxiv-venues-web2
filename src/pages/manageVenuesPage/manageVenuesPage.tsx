import type {VenueDto} from "@/lib/services/venues2/dtos/venueDto.ts";

import React, {memo, useCallback} from 'react';
import {useUser} from "@/lib/services/user/hooks/useUser.ts";
import {useUsersVenues} from "@/lib/services/venues2/useUsersVenues.ts";
import {useNavigate} from "react-router";
import {DefaultPageLayout} from "@/pageLayouts/defaultPageLayout.tsx";
import {Plus} from "lucide-react";
import {Trans} from "@lingui/react/macro";
import {Button} from "@/components/ui/shadcn/button.tsx";
import {deleteVenue} from "@/lib/services/venues2/deleteVenue.ts";
import {Card} from "@/components/ui/shadcn/card.tsx";
import {VenueManagementCard} from "@/components/venueCard/venueManagementCard.tsx";
import {NoUser} from "@/lib/services/user/macros/getUser.ts";

export const ManageVenuesPage = memo(() => {
  const navigate = useNavigate();
  const user = useUser();
  const [ usersVenues, refreshUsersVenues ] = useUsersVenues(user?.userId);

  const onCreateClickCallback = useCallback(() => navigate(`/venue/create`), [navigate]);
  const onEditClickCallback = useCallback((venue: VenueDto) => navigate(`/venue/${venue.id}/edit`), [navigate]);
  const onOpeningsClickCallback = useCallback((venue: VenueDto) => navigate(`/venue/${venue.id}/openings`), [navigate]);
  const onClosuresClickCallback = useCallback((venue: VenueDto) => navigate(`/venue/${venue.id}/closures`), [navigate]);
  const onDeleteClickCallback = useCallback(async (venue: VenueDto) => { await deleteVenue(venue.id); refreshUsersVenues(); }, []);

  if (user === NoUser) {
    navigate(`/`);
  }

  return <DefaultPageLayout>
    <DefaultPageLayout.Panel>
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
                <VenueManagementCard key={venue.id} venue={venue} onEditClick={onEditClickCallback} onOpenClick={onOpeningsClickCallback} onCloseClick={onClosuresClickCallback} onDeleteClick={onDeleteClickCallback} />)}
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



