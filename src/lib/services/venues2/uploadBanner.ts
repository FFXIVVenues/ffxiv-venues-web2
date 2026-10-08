import {request, useEnv} from "@/lib/utils";

export async function uploadBanner(id: string, banner: Blob): Promise<void> {
    const response = await request(useEnv("FFXIV_VENUES_API_ROOT") + `/odata/Venues('${id}')/banner`, {
        method: "PUT",
        credentials: "include",
        headers: {"Content-Type": banner.type},
        body: banner,
    });
    if (!response.ok) throw response;
}
