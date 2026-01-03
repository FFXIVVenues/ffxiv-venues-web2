import {Day} from "@/model/day.ts";
import type {TimeDto} from "./timeDto.ts";
import type {IntervalDto} from "./intervalDto.ts";
import type {LocationDto} from "./locationDto.ts";

import type {OpeningDto} from "./openingDto.ts";

export interface ScheduleDto {
    commencing?: string; // ISODateString
    day: Day;
    start: TimeDto;
    end?: TimeDto;
    interval: IntervalDto;
    location?: LocationDto;
    resolution?: OpeningDto;
    utc?: ScheduleDto;
}