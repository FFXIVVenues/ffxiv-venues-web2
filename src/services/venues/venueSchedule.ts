import type {VenueViewModel} from "./venueService.ts";

export interface VenueSchedule {
    favourites: VenueViewModel[];
    newest: VenueViewModel[];
    open: VenueViewModel[];
    scheduled: VenueViewModel[][];
    future: VenueViewModel[];
    unscheduled: VenueViewModel[];
}