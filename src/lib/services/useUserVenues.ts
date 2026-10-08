import {request, useEnv} from "@/lib/utils";
import {useEffect, useState} from "react";
import type {VenueDto} from "@/lib/services/venues/dtos/venueDto.ts";
import {Venue} from "@/lib/model/venue.ts";

type ODataResponse<T> = {
  "@odata.context": string;
  value: T;
}

export const useUserVenues = (userId?: string) => {
  const [ usersVenues, setUsersVenues ] = useState<Venue[] | null>(null);

  useEffect(() => {
    if (userId == null) return;
    const usersVenuesUri = useEnv("FFXIV_VENUES_API_ROOT") + `/odata/venues?$filter=managers/any(m: m eq '${userId}')`;
    request(usersVenuesUri, { credentials: 'include' })
      .then(response => response.json() as Promise<ODataResponse<VenueDto[]>>)
      .then(venues => venues.value.map(v => new Venue(v)))
      .then(setUsersVenues)
      .catch();
  }, [ userId ])

  return usersVenues;
}