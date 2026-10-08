import type {LocationDto} from "./locationDto.ts";
import type {ScheduleDto} from "./scheduleDto.ts";

export interface VenueDto {
    id: string;
    name: string | null;
    banner: string | null;
    description: string[];
    website: string | null;
    discord: string | null;
    sfw: boolean;
    tags: string[];
    location: LocationDto | null;
    schedule: ScheduleDto[];
    approved: boolean;
}

export type VenueRequestDto = Omit<VenueDto, "id" | "banner">;