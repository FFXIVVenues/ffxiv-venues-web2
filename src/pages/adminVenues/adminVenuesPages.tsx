import type {VenueDto} from "@/lib/services/venues2/dtos/venueDto.ts";

import React, {type ChangeEvent, memo, useCallback, useState} from 'react';
import {NoUser, useUser} from "@/lib/services/user/useUser.ts";
import {useNavigate} from "react-router";
import {DefaultPageLayout} from "@/pageLayouts/defaultPageLayout.tsx";
import {deleteVenue} from "@/lib/services/venues2/deleteVenue.ts";
import {VenueManagementCard} from "@/components/venueCard/venueManagementCard.tsx";
import {useVenues} from "@/lib/services/venues2/useVenues.ts";
import {NoAuthorization, useAuthorization} from "@/lib/services/user/useAuthorization.ts";
import {SidebarGroup} from "@/components/ui/shadcn/sidebar.tsx";
import {FieldLabel} from "@/components/ui/shadcn/field.tsx";
import {Trans} from "@lingui/react/macro";
import {Input} from "@/components/ui/shadcn/input.tsx";
import {t} from "@lingui/core/macro";
import {useDebouncer} from "@/lib/utils/hooks/useDebouncer.ts";
import {canEdit} from "@/lib/services/user/canEdit.ts";
import {canEditManagers} from "@/lib/services/user/canEditManagers.ts";
import {canDelete} from "@/lib/services/user/canDelete.ts";

export const AdminVenuesPages = memo(() => {
  const navigate = useNavigate();
  const user = useUser();
  const authorization = useAuthorization();
  const [ search, setSearch ] = useState("true");
  const filter = authorization == null || authorization == NoAuthorization ? null :
    `(${search}) and ((${authorization?.edit}) or (${authorization?.editManagers}) or (${authorization?.editApproval}) or (${authorization?.delete}))`;
  const [ venues, refreshVenues ] = useVenues(filter);
  const onEditClickCallback = useCallback(
    (venue: VenueDto) => navigate(`/venue/${venue.id}/edit`), [navigate]);
  const onOpeningsClickCallback = useCallback(
    (venue: VenueDto) => navigate(`/venue/${venue.id}/openings`), [navigate]);
  const onClosuresClickCallback = useCallback(
    (venue: VenueDto) => navigate(`/venue/${venue.id}/closures`), [navigate]);
  const onDeleteClickCallback = useCallback(
    async (venue: VenueDto) => {
      await deleteVenue(venue.id);
      refreshVenues();
    }, []);
  const searchDebouncer = useDebouncer(2000);
  const searchFilterCallback = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => searchDebouncer(() =>
      setSearch(`contains(tolower(Name), '${e.target.value.toLowerCase()}')`)), []);

  if (user === NoUser) {
    navigate(`/`);
  }

  return <DefaultPageLayout>
    <DefaultPageLayout.Panel>
      <SidebarGroup>
        <FieldLabel htmlFor="search-venues" className="sr-only"><Trans>Search venues</Trans></FieldLabel>
        <Input id="search-venues"
               type="text"
               placeholder={t`Search venues`}
               onChange={searchFilterCallback} />
      </SidebarGroup>
    </DefaultPageLayout.Panel>
    <DefaultPageLayout.Page>
      {user === null || authorization === null
        ? <>Loading...</>
        : user === NoUser
        ? <>Not logged in...</>
        : venues == null
        ? <>Fetching your venues...</>
        : venues.length == 0
        ? <>No venues...</>
        : <div className="py-8 px-12">
            <div className="flex flex-wrap gap-8 content-between flex-wrap align-middle justify-left">
              {venues.map((venue) =>
                <VenueManagementCard key={venue.id} venue={venue}
                                     onEditClick={canEdit(venue, user, authorization) || canEditManagers(venue, user, authorization) ? onEditClickCallback : null}
                                     onOpenClick={canEdit(venue, user, authorization) ? onOpeningsClickCallback : null}
                                     onCloseClick={canEdit(venue, user, authorization) ? onClosuresClickCallback : null}
                                     onDeleteClick={canDelete(venue, user, authorization) ? onDeleteClickCallback : null} />)}
            </div>
          </div>
      }
    </DefaultPageLayout.Page>
  </DefaultPageLayout>
});












