import type {TimeDto} from "../services/venues/dtos/timeDto.ts";

export class Time {

    hour: number;
    minute: number;
    timeZone: string;
    nextDay: boolean;

    constructor(timeDto: TimeDto) {
        this.hour = timeDto.hour;
        this.minute = timeDto.minute;
        this.timeZone = timeDto.timeZone;
        this.nextDay = timeDto.nextDay;
    }

}