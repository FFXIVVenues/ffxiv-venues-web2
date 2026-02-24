import {IntervalType} from "../../../model/intervalType.ts";

export interface IntervalDto {
    intervalType: IntervalType;
    intervalArgument: number;
}