import {request, useEnv} from "@/lib/utils";
import type {VenueDto} from "@/lib/services/venues2/dtos/venueDto.ts";

export async function deleteVenue(venueId: string): Promise<VenueDto> {
  const response = await request(useEnv("FFXIV_VENUES_API_ROOT") + `/odata/Venues('${venueId}')`, {
    method: "DELETE",
    credentials: "include"
  });
  if (!response.ok) throw response;
  return response.json();
}