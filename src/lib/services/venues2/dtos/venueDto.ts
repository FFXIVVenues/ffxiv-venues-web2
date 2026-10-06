import type {LocationDto} from "./locationDto.ts";
import type {ScheduleDto} from "./scheduleDto.ts";

export interface VenueDto {
    Id: string;
    Name: string | null;
    Banner: string | null;
    Description: string[];
    Website: string | null;
    Discord: string | null;
    Sfw: boolean;
    Tags: string[];
    Location: LocationDto | null;
    Schedule: ScheduleDto[];
}

export type VenueRequestDto = Omit<VenueDto, "Id" | "Banner">;