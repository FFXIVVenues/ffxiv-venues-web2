import {request, useEnv} from "@/lib/utils";
import type {VenueRequestDto} from "@/lib/services/venues2/dtos/venueDto.ts";

export async function updateVenue(id: string, venue: Partial<VenueRequestDto>): Promise<void> {
    const response = await request(useEnv("FFXIV_VENUES_API_ROOT") + `/odata/Venues('${id}')`, {
        method: "PATCH",
        credentials: "include",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(venue),
    });
    if (!response.ok) throw response;
}
