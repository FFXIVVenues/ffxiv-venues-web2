import {request, useEnv} from "@/lib/utils";
import { useEffect, useState} from "react";
import type {VenueDto} from "@/lib/services/venues2/dtos/venueDto.ts";
import {useUser} from "@/lib/services/user/useUser.ts";
import type {Nullable} from "@/lib/utils/nullable.ts";

type ODataResponse<T> = {
  "@odata.context": string;
  value: T;
}

export const useVenues = (filter: Nullable<string>): [ VenueDto[]|null, () => void ] => {
  const user = useUser();
  const [ venues, setVenues ] = useState<VenueDto[] | null>(null);
  const [ refresh, setRefresh ] = useState<boolean>(false);
  useEffect(() => {
    const path = filter ? `/odata/venues?$filter=${filter}` : `/odata/venues`;
    const usersVenuesUri = useEnv("FFXIV_VENUES_API_ROOT") + path;
    request(usersVenuesUri, { credentials: 'include' })
      .then(response => response.json() as Promise<ODataResponse<VenueDto[]>>)
      .then(venues => venues.value)
      .then(setVenues)
      .catch(console.error);
  }, [ filter, user, refresh ]);

  return [ venues, () => setRefresh(!refresh) ];
}