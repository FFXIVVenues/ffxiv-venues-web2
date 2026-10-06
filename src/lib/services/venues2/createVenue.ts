import {request, useEnv} from "@/lib/utils";
import type {VenueDto, VenueRequestDto} from "@/lib/services/venues2/dtos/venueDto.ts";

export async function createVenue(venue: VenueRequestDto): Promise<VenueDto> {
    const response = await request(useEnv("FFXIV_VENUES_API_ROOT") + "/odata/Venues", {
        method: "POST",
        credentials: "include",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(venue),
    });
    if (!response.ok) throw response;
    return response.json();
}
