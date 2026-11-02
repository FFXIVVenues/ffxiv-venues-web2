import {useNavigate} from "react-router";
import React, {use, useCallback, useEffect, useState} from "react";
import {getUser} from "@/lib/services/user/macros/getUser.ts";
import {getAuthorization} from "@/lib/services/user/macros/getAuthorization.ts";
import type {Nullable} from "@/lib/utils/nullable.ts";
import type {VenueDto} from "@/lib/services/venues2/dtos/venueDto.ts";
import {getVenues} from "@/lib/services/venues2/getVenues.ts";
import {deleteVenue} from "@/lib/services/venues2/deleteVenue.ts";
import {Loader2Icon} from "lucide-react";
import {canEdit} from "@/lib/services/user/macros/canEdit.ts";
import {canEditManagers} from "@/lib/services/user/macros/canEditManagers.ts";
import {canDelete} from "@/lib/services/user/macros/canDelete.ts";
import {VenueManagementCard} from "@/components/venueCard/venueManagementCard.tsx";

export const StaffVenuesPageContent = ({search}: { search: string }) => {
  const navigate = useNavigate();
  const user = use(getUser());
  const authorization = use(getAuthorization());
  const [venues, setVenues] = useState<Nullable<VenueDto[]>>(null);

  useEffect(() => {
    let filter = `((${authorization?.edit}) or (${authorization?.editManagers}) or (${authorization?.editApproval}) or (${authorization?.delete}))`;
    if (search) filter += `and (contains(tolower(Name), '${search}'))`
    getVenues(filter).then(setVenues);
  }, [ search, authorization.edit, authorization.editManagers, authorization.editApproval, authorization.delete ]);

  const onEditClickCallback = useCallback((venue: VenueDto) => navigate(`/venue/${venue.id}/edit`), [navigate]);
  const onOpenClickCallback = useCallback((venue: VenueDto) => navigate(`/venue/${venue.id}/openings`), [navigate]);
  const onCloseClickCallback = useCallback((venue: VenueDto) => navigate(`/venue/${venue.id}/closures`), [navigate]);
  const onDeleteClickCallback = useCallback((venue: VenueDto) =>
      deleteVenue(venue.id).then(_ => setVenues(venues!.filter(v => v.id != venue.id))),
    []);

  if (venues == null)
    return <><Loader2Icon className="size-4 animate-spin"/> Fetching your venues...</>

  if (venues.length == 0)
    return <>You don't have any venues right now.</>

  return <div className="py-8 px-12">
    <div className="flex flex-wrap gap-8 content-between align-middle justify-left">
      {venues.map((venue) => {
        const hasEdit = canEdit(venue, user, authorization);
        const hasEditManagers = canEditManagers(venue, user, authorization);
        const hasDelete = canDelete(venue, user, authorization);

        return <VenueManagementCard key={venue.id} venue={venue}
                                    onEditClick={hasEdit || hasEditManagers ? onEditClickCallback : null}
                                    onOpenClick={hasEdit ? onOpenClickCallback : null}
                                    onCloseClick={hasEdit ? onCloseClickCallback : null}
                                    onDeleteClick={hasDelete ? onDeleteClickCallback : null}/>
      })}
    </div>
  </div>
}