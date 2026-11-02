import {request, useEnv} from "@/lib/utils";
import type {VenueDto} from "@/lib/services/venues2/dtos/venueDto.ts";
import type {Nullable} from "@/lib/utils/nullable.ts";

type ODataResponse<T> = {
  "@odata.context": string;
  value: T;
}

export const getVenues = (filter: Nullable<string>): Promise<Nullable<VenueDto[]>> => {
    const path = filter ? `/odata/venues?$filter=${filter}` : `/odata/venues`;
    const venuesUri = useEnv("FFXIV_VENUES_API_ROOT") + path;
    return request(venuesUri, { credentials: 'include' })
      .then(response => response.json() as Promise<ODataResponse<VenueDto[]>>)
      .then(venues => venues.value)
      .catch(e => {
        console.log(e);
        return null;
      });
}