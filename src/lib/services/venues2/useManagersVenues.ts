import {request, useEnv} from "@/lib/utils";
import {useEffect, useState} from "react";
import type {VenueDto} from "@/lib/services/venues2/dtos/venueDto.ts";

type ODataResponse<T> = {
  "@odata.context": string;
  value: T;
}

export const useManagersVenues = (userId?: string) => {
  const [ usersVenues, setUsersVenues ] = useState<VenueDto[] | null>(null);

  useEffect(() => {
    if (userId == null) return;
    const usersVenuesUri = useEnv("FFXIV_VENUES_API_ROOT") + `/odata/venues?$filter=managers/any(m: m eq '${userId}')`;
    request(usersVenuesUri, { credentials: 'include' })
      .then(response => response.json() as Promise<ODataResponse<VenueDto[]>>)
      .then(venues => venues.value)
      .then(setUsersVenues)
      .catch();
  }, [ userId ])

  return usersVenues;
}