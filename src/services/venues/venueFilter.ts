import type {Venue} from "../../model/venue.ts";

export type VenueFilter = (venue: Venue) => boolean;
