import type {Day} from "@/lib/model/day.ts";
import type {IntervalType} from "@/lib/model/intervalType.ts";

export interface ScheduleDto {
    day: keyof typeof Day;
    startHour: number;
    startMinute: number;
    endHour: number | null;
    endMinute: number | null;
    timeZone: string | null;
    intervalType: keyof typeof IntervalType;
    intervalArgument: number;
    commencing: string | null;
}