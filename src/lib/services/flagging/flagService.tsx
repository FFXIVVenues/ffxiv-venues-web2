import {request, useEnv} from "@/lib/utils";
import { toast } from "sonner"

export enum FlagCategory {
    VenueEmpty = "VenueEmpty",
    IncorrectInformation = "IncorrectInformation",
    InappropriateContent = "InappropriateContent"
}

class FlagService {

    async flagVenue(venueId: string, flagCategory: FlagCategory, description?: string): Promise<Response> {
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                venueId: venueId,
                category: flagCategory,
                description: description
            })
        };
        const response = await request(useEnv("FFXIV_VENUES_API_ROOT") + `/v1.0/venue/${venueId}/flag`, requestOptions);
        if (!response.ok) {
            throw new Error("Response status code not OK");
        }

        toast.success("Flag accepted", {
            description: "Your flag has been submitted for review. The team usually actions flags within 24 hours",
        })

        return response;
    }

}

const flagService = new FlagService();

export { flagService };