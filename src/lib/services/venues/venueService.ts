import type {VenueDto} from "./dtos/venueDto.ts";
import type {VenueSchedule} from "./venueSchedule.ts";
import {Venue} from "@/lib/model/venue.ts";
import type {Opening} from "@/lib/model/opening.ts";
import type {VenueFilter} from "./venueFilter.ts";
import {useEnv} from "@/lib/utils/hooks/useEnv.ts";
import {hideService} from "@/lib/services/hideVenue/hideService.ts";
import {request} from "@/lib/utils";

export interface ScheduleItem {
    venue: Venue;
    opening?: Opening;
}

class VenueService {
    private _fetchPromise?: Promise<Venue[]> = undefined;

    getVenues(): Promise<Venue[]> {
        const venuesUrl = useEnv("FFXIV_VENUES_API_ROOT") + "/v1.0/venue";
        return this._fetchPromise ??= new Promise((resolve, reject) => {
            request(venuesUrl)
                .then(response => response.json() as Promise<VenueDto[]>)
                .then(venues => venues.map(v => new Venue(v)))
                .then(resolve)
                .catch(reject);
        });
    }
    
    async getVenueById(id: string): Promise<Venue | undefined> {
        const venues = await this.getVenues();
        return venues.find(v => v.id === id);
    }

    async getVenueSchedule(filters?: VenueFilter[], showHidden?: boolean): Promise<VenueSchedule> {
        const venueViewModels: VenueSchedule = {
            favourites: [],
            newest: [],
            open: [],
            scheduled: [ [], [], [], [], [], [], [] ],
            future: [],
            unscheduled: []
        };
        const now = new Date();
        const today = now.getDay();
    
        for (const venue of await this.getVenues()) {
            if (filters && filters.length > 0 && !filters.every(filter => filter(venue))) {
                continue;
            }

            if (!showHidden && hideService.isHidden(venue.id)) {
                continue;
            }

            if (venue.isFavourite())
                venueViewModels.favourites.push({ venue });
            if (venue.isNew())
                venueViewModels.newest.push({ venue });
            if (venue.resolution?.isNow)
                venueViewModels.open.push({ venue });

            if (!(venue.schedule?.length || venue.scheduleOverrides?.filter(o => new Date(o.end) > now).length)) {
                venueViewModels.unscheduled.push({ venue });
                continue;
            }
            for (const opening of venue.schedule) {
                if (!opening.resolution) continue;
                const venueViewModel = { venue, opening: opening.resolution };
                if (opening.resolution.isWithinWeek === false) {
                    venueViewModels.future.push(venueViewModel);
                    continue;
                }
                const venueDay = new Date(opening.resolution.start).getDay();
                const relativeDay = (venueDay - today + 7) % 7;
                venueViewModels.scheduled[relativeDay]!.push(venueViewModel);
            }
            for (const override of venue.scheduleOverrides) {
                if (!override.open)
                    continue;

                if (new Date(override.end) < now)
                    continue;

                const venueViewModel = { venue, opening: override };
                const venueDay = new Date(override.start).getDay();
                const relativeDay = (venueDay - today + 7) % 7;
                venueViewModels.scheduled[relativeDay]!.push(venueViewModel);
            }
        }

        venueViewModels.open = venueViewModels.open.sort((one, another) => (new Date(another.venue.resolution!.start).getTime()) - (new Date(one.venue.resolution!.start).getTime()));
        venueViewModels.scheduled = venueViewModels.scheduled.map(day => day.sort((one, another) =>
           new Date(one.opening!.start).getHours() - new Date(another.opening!.start).getHours()
        || new Date(one.opening!.start).getMinutes() - new Date(another.opening!.start).getMinutes()));
        venueViewModels.newest = venueViewModels.newest.sort((a, b) => ((b.venue.added && (new Date(b.venue.added).getTime())) || 0) - ((a.venue.added && (new Date(a.venue.added).getTime())) || 0));
        venueViewModels.future = venueViewModels.future.sort((a, b) => new Date(a.opening!.start).getTime() - new Date(b.opening!.start).getTime());

        return venueViewModels;
    }
    
}

const venueService = new VenueService();

export { venueService };