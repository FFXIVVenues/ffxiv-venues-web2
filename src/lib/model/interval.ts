import {IntervalType} from "./intervalType.ts";
import type {IntervalDto} from "../services/venues/dtos/intervalDto.ts";

export class Interval {
    intervalType: IntervalType;
    intervalArgument: number;

    constructor(intervalDto: IntervalDto) {
        this.intervalType = intervalDto.intervalType;
        this.intervalArgument = intervalDto.intervalArgument;
    }
}