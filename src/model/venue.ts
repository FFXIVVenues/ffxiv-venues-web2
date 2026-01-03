import type { VenueDto } from "../services/venues/dtos/venueDto.ts";

import { favouritesService } from "../services/favouritesService";
import { visitedService } from "../services/visitedService";

import { Location } from "./location";
import { Schedule } from "./schedule";
import { ScheduleOverride } from "./scheduleOverride"
import { Opening } from "./opening.ts";

class Venue {

    id: string;
    name: string;
    bannerUri?: string;
    added: Date;
    description: string[];
    location: Location;
    website?: string;
    discord?: string;
    sfw: boolean;
    schedule: Schedule[];
    scheduleOverrides: ScheduleOverride[];
    tags: string[];
    resolution?: Opening;

    constructor(venueDto: VenueDto) {
        this.id = venueDto.id;
        this.name = venueDto.name;
        this.bannerUri = venueDto.bannerUri;
        this.description = venueDto.description;
        this.website = venueDto.website;
        this.discord = venueDto.discord;
        this.sfw = venueDto.sfw;
        this.tags = venueDto.tags;

        this.added = new Date(venueDto.added);
        this.location = new Location(venueDto.location);
        this.schedule = venueDto.schedule.map(o => new Schedule(o));
        this.scheduleOverrides = venueDto.scheduleOverrides.map(o => new ScheduleOverride(o));
        this.resolution = venueDto.resolution ? new Opening(venueDto.resolution) : undefined;
    }

    isFavourite() {
        return favouritesService.getFavourites().indexOf(this.id) !== -1;
    }

    isVisited() {
        return visitedService.getVisited().indexOf(this.id) !== -1;
    }

    isNew() {
        const newIfAfter = new Date();
        newIfAfter.setDate(newIfAfter.getDate() - 14);
        return this.added && new Date(this.added) > newIfAfter
    }

}

export { Venue };