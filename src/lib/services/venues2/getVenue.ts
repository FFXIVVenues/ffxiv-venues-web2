import {request, useEnv} from "@/lib/utils";
import type {VenueDto} from "@/lib/services/venues2/dtos/venueDto.ts";

export async function getVenue(id: string): Promise<VenueDto | undefined> {
    const response = await request(useEnv("FFXIV_VENUES_API_ROOT") + `/odata/Venues('${id}')?$expand=Schedule`, {credentials: "include"});
    if (response.status === 404) return undefined;
    if (!response.ok) throw response;
    return response.json();
}
