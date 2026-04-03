import {request, useEnv} from "@/lib/utils";
import { toast } from "sonner"
import type {RetryContext} from "@/lib/utils/request.ts";

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
        const backOffOptions = {
            onRetry: (context: RetryContext) => {
                const retry = Math.round(context.retryAfter / 1000);
                toast.error("Failed to flag venue", {
                    description: "Retrying in " + retry + " seconds.",
                    duration: context.retryAfter
                })
            },
        };
        const response = await request(useEnv("FFXIV_VENUES_API_ROOT") + `/v1.0/venue/${venueId}/flag`, requestOptions, backOffOptions);
        if (!response.ok) {
            throw response;
        }

        toast.success("Flag accepted", {
            description: "Your flag has been submitted for review. The team usually actions flags within 24 hours",
        })

        return response;
    }

}

const flagService = new FlagService();

export { flagService };