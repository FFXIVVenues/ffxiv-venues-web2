import type {LocationDto} from "./locationDto.ts";
import type {ScheduleDto} from "./scheduleDto.ts";
import type {ScheduleOverrideDto} from "@/lib/services/venues2/dtos/scheduleOverrideDto.ts";

export interface VenueDto {
    id: string;
    name: string;
    banner: string | null;
    description: string[];
    website: string | null;
    discord: string | null;
    sfw: boolean;
    tags: string[];
    location: LocationDto | null;
    schedule: ScheduleDto[];
    scheduleOverrides?: ScheduleOverrideDto[];
    approved: boolean;
    managers: string[];
}

export type VenueRequestDto = Omit<VenueDto, "id" | "banner" | "approved">;