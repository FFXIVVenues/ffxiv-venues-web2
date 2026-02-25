export interface OpeningDto {
    start: string; // ISODateString
    end: string;   // ISODateString
    isNow?: boolean;
    isWithinWeek?: boolean;
}