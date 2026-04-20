import {useEffect, useState} from "react";
import {venueService} from "./venueService.ts";
import {favouritesService} from "../favouritesService.ts";
import type {VenueFilter} from "./venueFilter.ts";
import type {VenueSchedule} from "./venueSchedule.ts";
import {hideService} from "@/lib/services/hideVenue/hideService.ts";

export const useVenueSchedule = (initialFilters: VenueFilter[], showHidden?: boolean) => {
    const [ filters, internalSetFilters ] = useState(initialFilters);
    const [ error, setError ] = useState<Error|null>(null);
    const [ venues, setVenues ] = useState<VenueSchedule|null>(null);
    useEffect(() => { venueService.getVenueSchedule(filters, showHidden).then(setVenues).catch(setError) }, [ filters, showHidden ]);
    useEffect(() => { favouritesService.observe(() => { venueService.getVenueSchedule(filters, showHidden).then(setVenues).catch(setError)}) }, []);
    useEffect(() => hideService.observe(() => { venueService.getVenueSchedule(filters, showHidden).then(setVenues).catch(setError) }), []);

    const setFilters = (filters: VenueFilter[]) =>
        venueService.getVenueSchedule(filters)
            .then(setVenues)
            .catch(setError)
            .then(() => internalSetFilters(filters));

    return [ venues, error, setFilters ] as const;
}