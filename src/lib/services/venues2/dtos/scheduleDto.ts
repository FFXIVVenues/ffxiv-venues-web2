import type {Day} from "@/lib/model/day.ts";
import type {IntervalType} from "@/lib/model/intervalType.ts";

export interface ScheduleDto {
    Day: keyof typeof Day;
    StartHour: number;
    StartMinute: number;
    EndHour: number | null;
    EndMinute: number | null;
    TimeZone: string | null;
    IntervalType: keyof typeof IntervalType;
    IntervalArgument: number;
    Commencing: string | null;
}