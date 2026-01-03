import type {OpeningDto} from "../services/venues/dtos/openingDto.ts";

export class Opening {
    start: Date;
    end: Date;
    isNow?: boolean;
    isWithinWeek?: boolean;

    constructor(openingDto: OpeningDto) {
        this.start = new Date(openingDto.start);
        this.end = new Date(openingDto.end);
        this.isNow = openingDto.isNow;
        this.isWithinWeek = openingDto.isWithinWeek;
    }
}