import {request, useEnv} from "@/lib/utils";
import type {User} from "@/lib/services/user/dtos/user.ts";

export async function getDiscordUser(venueId: string, id: string): Promise<User | null> {
    const response = await request(useEnv("FFXIV_VENUES_API_ROOT") + `/odata/Venues('${venueId}')/managers(${id})`, {credentials: "include"}, {maxRetries: 0});
    if (response.status === 404) return null;
    if (!response.ok) throw response;
    return response.json();
}