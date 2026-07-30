import type {ScheduleDto} from "../services/venues/dtos/scheduleDto.ts";
import {Opening} from "./opening.ts";
import {Time} from "./time.ts";
import type {Day} from "./day.ts";
import {Location} from "./location.ts";
import {Interval} from "./interval.ts";

class Schedule {

    commencing?: Date;
    day: Day;
    start: Time;
    end?: Time;
    interval: Interval;
    location?: Location;
    resolution?: Opening;
    utc?: Schedule;

    constructor(scheduleDto: ScheduleDto) {
        this.day = scheduleDto.day;
        this.start = scheduleDto.start;
        this.interval = scheduleDto.interval;

        this.location = scheduleDto.location ? new Location(scheduleDto.location) : undefined;
        this.end = scheduleDto.end ? new Time(scheduleDto.end) : undefined;
        this.utc = scheduleDto.utc ? new Schedule(scheduleDto.utc) : undefined;
        this.commencing = scheduleDto.commencing ? new Date(scheduleDto.commencing) : undefined;
        this.resolution = scheduleDto.resolution ? new Opening(scheduleDto.resolution) : undefined;
    }
}

export { Schedule };