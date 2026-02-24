export enum FlagCategory {
    VenueEmpty = "VenueEmpty",
    IncorrectInformation = "IncorrectInformation",
    InappropriateContent = "InappropriateContent"
}

class FlagService {

    flagVenue(venueId: string, flagCategory: FlagCategory, description: string): Promise<Response> {
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                venueId: venueId,
                category: flagCategory,
                description: description
            })
        };
        return fetch(process.env.FFXIV_VENUES_WEB_API_ROOT + `/v1.0/venue/${venueId}/flag`, requestOptions);
    }

}

const flagService = new FlagService();

export { flagService };