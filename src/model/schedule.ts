import {nth} from "../utility/nth";
import days from "./consts/days.json";
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

    toString() {
        let string = "";
        let dayInt = this.day;
        if (this.resolution)
            dayInt = (this.resolution.start.getDay()+6)%7;
        const day = days[dayInt];
        if (this.interval.intervalType === 0) {
            if (this.interval.intervalArgument === 1)
                string += "Weekly on ";
            else if (this.interval.intervalArgument === 2)
                string += "Biweekly on ";
            else {
                string += this.interval.intervalArgument;
                string += " weekly on ";
            }
            string += day;
            string += 's';
        }
        else if (this.interval.intervalType === 1 && this.interval.intervalArgument > 0) {
            string += this.interval.intervalArgument;
            string += nth(this.interval.intervalArgument);
            string += ' ';
            string += day;
            string += " of the month";
        }
        else if (this.interval.intervalType === 1 && this.interval.intervalArgument === -1) {
            string += "Last ";
            string += day;
            string += " of the month";
        }
        else if (this.interval.intervalType === 1 && this.interval.intervalArgument < -1) {
            string += Math.abs(this.interval.intervalArgument);
            string += nth(Math.abs(this.interval.intervalArgument));
            string += " last ";
            string += day;
            string += " of the month";
        }

        return string;
    }

}

export { Schedule };