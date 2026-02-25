import type {LocationDto} from "./locationDto.ts";
import type {ScheduleDto} from "./scheduleDto.ts";
import type {ScheduleOverrideDto} from "./scheduleOverrideDto.ts";
import type {OpeningDto} from "./openingDto.ts";
import type {NoticeDto} from "./noticeDto.ts";

export interface VenueDto {
    id: string;
    name: string;
    bannerUri?: string;
    added: string; // ISODateString
    description: string[];
    location: LocationDto;
    website?: string;
    discord?: string;
    openHouse: boolean;
    sfw: boolean;
    schedule: ScheduleDto[];
    scheduleOverrides: ScheduleOverrideDto[];
    notices: NoticeDto[];
    managers: string[];
    tags: string[];
    approved: boolean;
    lastModified?: string; // ISODateString
    mareCode?: string;
    marePassword?: string;
    resolution?: OpeningDto;
}