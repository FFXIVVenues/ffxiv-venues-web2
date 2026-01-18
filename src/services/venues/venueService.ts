import type {VenueDto} from "./dtos/venueDto.ts";
import type {VenueSchedule} from "./venueSchedule.ts";
import {Venue} from "@/model/venue.ts";
import type {Opening} from "@/model/opening.ts";
import type {VenueFilter} from "./venueFilter.ts";

export interface ScheduleItem {
    venue: Venue;
    opening?: Opening;
}


class VenueService {
    private _fetchPromise?: Promise<Venue[]> = undefined;

    getVenues(): Promise<Venue[]> {
        const venuesUrl = process.env.FFXIV_VENUES_WEB_API_ROOT + "/v1.0/venue";
        return this._fetchPromise ??= new Promise((resolve, reject) => {
            console.time('venueService.getVenues');
            fetch(venuesUrl)
                .then(response => response.json() as Promise<VenueDto[]>)
                .then(venues => venues.map(v => new Venue(v)))
                .then(resolve)
                .then(() => console.timeEnd('venueService.getVenues'))
                .catch(reject);
        });
    }
    
    async getVenueById(id: string): Promise<Venue | undefined> {
        const venues = await this.getVenues();
        return venues.find(v => v.id === id);
    }

    async getVenueSchedule(filters?: VenueFilter[]): Promise<VenueSchedule> {
        console.time('venueService.getVenueSchedule');

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

        console.timeEnd('venueService.getVenueSchedule');
        return venueViewModels;
    }
    
}

const venueService = new VenueService();

export { venueService };