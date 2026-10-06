import {memo, useCallback} from 'react';
import {NoUser, useUser} from "@/lib/services/useUser.ts";
import {useUserVenues} from "@/lib/services/useUserVenues.ts";
import {VenueCardFull} from "@/components/venueCard/venueCardFull.tsx";
import {useNavigate} from "react-router";
import type {Venue} from "@/lib/model/venue.ts";


export const ManageVenuesPage = memo(() => {
  const navigate = useNavigate();
  const user = useUser();
  const usersVenues = useUserVenues(user?.userId);
  const onClickCallback = useCallback(
    (v: Venue) => navigate(`/venue/${v.id}`), [navigate]);
  if (user === null) {
    return <div>Loading...</div>
  }

  if (user === NoUser) {
    return <div>Not logged in...</div>
  }

  if (usersVenues == null || usersVenues.length === 0) {
    return <div>You don't manage any venues...</div>
  }

  return <div>
    {usersVenues.map((venue) =>
      <VenueCardFull venue={venue} key={venue.id} onClick={onClickCallback}/>
    )}
  </div>
});