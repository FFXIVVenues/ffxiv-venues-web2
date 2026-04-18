export interface ScheduleOverrideDto {
    open: boolean;
    start: string; // ISODateString
    end: string;   // ISODateString
    isNow: boolean;
}