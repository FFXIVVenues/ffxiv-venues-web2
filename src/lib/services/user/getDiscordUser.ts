import {request, useEnv} from "@/lib/utils";
import type {User} from "@/lib/services/user/dtos/user.ts";

export async function getDiscordUser(id: string, signal?: AbortSignal): Promise<User | null> {
    const response = await request(useEnv("FFXIV_VENUES_API_ROOT") + `/discord/users/${id}`, {credentials: "include", signal}, {maxRetries: 0});
    if (response.status === 404) return null;
    if (!response.ok) throw response;
    return response.json();
}