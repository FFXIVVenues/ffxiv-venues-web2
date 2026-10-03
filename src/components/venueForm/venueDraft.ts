import {type Slot, toSchedule, toSlot} from "./scheduleSlots";
import type {VenueDto} from "@/lib/services/venues/dtos/venueDto.ts";
import {timeZones} from "@/lib/model/venueOptions.ts";
import type {LocationDto} from "@/lib/services/venues/dtos/locationDto.ts";

export type VenueDraft = {
    name: string;
    description: string;
    locationType: "House" | "Apartment" | "Room" | "Other";
    override: string;
    dataCenter: string;
    world: string;
    district: string;
    ward: number;
    plot: number;
    apartment: number;
    room: number;
    subdivision: boolean;
    sfw: boolean;
    tags: string[];
    website: string;
    discord: string;
    timeZone: string | null;
    slots: Slot[];
    banner: File | null;
};

export type NewVenue = Pick<VenueDto, "name" | "description" | "website" | "discord" | "sfw" | "tags">
    & {location: Omit<LocationDto, "shard" | "override"> & {override: string | null}; schedule: ReturnType<typeof toSchedule>};

export function toDraft(venue?: VenueDto): VenueDraft {
    const location = venue?.location;
    const zone = venue?.schedule[0]?.start.timeZone ?? Intl.DateTimeFormat().resolvedOptions().timeZone;

    return {
        name: venue?.name ?? "",
        description: venue?.description.join("\n\n") ?? "",
        locationType: location?.override ? "Other" : location?.apartment ? "Apartment" : location?.room ? "Room" : "House",
        override: location?.override ?? "",
        dataCenter: location?.dataCenter ?? "",
        world: location?.world ?? "",
        district: location?.district ?? "",
        ward: location?.ward ?? 0,
        plot: location?.plot ?? 0,
        apartment: location?.apartment ?? 0,
        room: location?.room ?? 0,
        subdivision: location?.subdivision ?? false,
        sfw: venue?.sfw ?? false,
        tags: (venue?.tags ?? []).filter(Boolean),
        website: venue?.website ?? "",
        discord: venue?.discord ?? "",
        timeZone: zone in timeZones ? zone : null,
        slots: (venue?.schedule ?? []).map(toSlot),
        banner: null,
    };
}

export function toVenue(draft: VenueDraft): NewVenue {
    const other = draft.locationType === "Other";
    const onPlot = !other && draft.locationType !== "Apartment";


    return {
        name: draft.name.trim(),
        description: draft.description.split(/\n\s*\n/).map(paragraph => paragraph.trim()).filter(Boolean),
        location: {
            dataCenter: other ? "" : draft.dataCenter,
            world: other ? "" : draft.world,
            district: other ? "" : draft.district,
            ward: other ? 0 : draft.ward,
            plot: onPlot ? draft.plot : 0,
            apartment: draft.locationType === "Apartment" ? draft.apartment : 0,
            room: draft.locationType === "Room" ? draft.room : 0,
            subdivision: onPlot ? draft.plot > 30 : draft.locationType === "Apartment" && draft.subdivision,
            override: other ? draft.override.trim() : null,
        },
        website: draft.website.trim() || undefined,
        discord: draft.discord.trim() || undefined,
        sfw: draft.sfw,
        tags: draft.tags,
        schedule: toSchedule(draft.slots, draft.timeZone ?? "UTC"),
    };
}