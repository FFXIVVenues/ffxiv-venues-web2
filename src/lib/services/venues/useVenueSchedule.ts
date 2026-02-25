import {useEffect, useState} from "react";
import {venueService} from "./venueService.ts";
import {favouritesService} from "../favouritesService.ts";
import type {VenueFilter} from "./venueFilter.ts";
import type {VenueSchedule} from "./venueSchedule.ts";

export const useVenueSchedule = (initialFilters: VenueFilter[]) => {
    const [ filters, internalSetFilters ] = useState(initialFilters);
    const [ error, setError ] = useState<Error|null>(null);
    const [ venues, setVenues ] = useState<VenueSchedule|null>(null);
    useEffect(() => { venueService.getVenueSchedule(filters).then(setVenues).catch(setError) }, [ filters ]);
    useEffect(() => { favouritesService.observe(() => { venueService.getVenueSchedule(filters).then(setVenues).catch(setError)}) }, [ ]);

    const setFilters = (filters: VenueFilter[]) =>
        venueService.getVenueSchedule(filters)
            .then(setVenues)
            .catch(setError)
            .then(() => internalSetFilters(filters));

    return [ venues, error, setFilters ] as const;
}