import type {ScheduleItem} from "./venueService.ts";

export interface VenueSchedule {
    favourites: ScheduleItem[];
    newest: ScheduleItem[];
    open: ScheduleItem[];
    scheduled: ScheduleItem[][];
    future: ScheduleItem[];
    unscheduled: ScheduleItem[];
}