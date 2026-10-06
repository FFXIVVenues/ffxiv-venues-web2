import {type Slot, toSchedule, toSlot} from "@/components/venueForm/scheduleSlots.ts";
import type {VenueDto, VenueRequestDto} from "@/lib/services/venues2/dtos/venueDto.ts";
import {timeZones} from "@/lib/model/venueOptions.ts";

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

export function toDraft(venue?: VenueDto): VenueDraft {
    const location = venue?.Location;
    const zone = venue?.Schedule[0]?.TimeZone ?? Intl.DateTimeFormat().resolvedOptions().timeZone;

    return {
        name: venue?.Name ?? "",
        description: venue?.Description.join("\n\n") ?? "",
        locationType: location?.Override ? "Other" : location?.Apartment ? "Apartment" : location?.Room ? "Room" : "House",
        override: location?.Override ?? "",
        dataCenter: location?.DataCenter ?? "",
        world: location?.World ?? "",
        district: location?.District ?? "",
        ward: location?.Ward ?? 0,
        plot: location?.Plot ?? 0,
        apartment: location?.Apartment ?? 0,
        room: location?.Room ?? 0,
        subdivision: location?.Subdivision ?? false,
        sfw: venue?.Sfw ?? false,
        tags: (venue?.Tags ?? []).filter(Boolean),
        website: venue?.Website ?? "",
        discord: venue?.Discord ?? "",
        timeZone: zone in timeZones ? zone : null,
        slots: (venue?.Schedule ?? []).map(toSlot),
        banner: null,
    };
}

export function toVenue(draft: VenueDraft): VenueRequestDto {
    const other = draft.locationType === "Other";
    const onPlot = !other && draft.locationType !== "Apartment";

    return {
        Name: draft.name.trim(),
        Description: draft.description.split(/\n\s*\n/).map(paragraph => paragraph.trim()).filter(Boolean),
        Location: {
            DataCenter: other ? null : draft.dataCenter,
            World: other ? null : draft.world,
            District: other ? null : draft.district,
            Ward: other ? 0 : draft.ward,
            Plot: onPlot ? draft.plot : 0,
            Apartment: draft.locationType === "Apartment" ? draft.apartment : 0,
            Room: draft.locationType === "Room" ? draft.room : 0,
            Subdivision: onPlot ? draft.plot > 30 : draft.locationType === "Apartment" && draft.subdivision,
            Override: other ? draft.override.trim() : null,
        },
        Website: draft.website.trim() || null,
        Discord: draft.discord.trim() || null,
        Sfw: draft.sfw,
        Tags: draft.tags,
        Schedule: toSchedule(draft.slots, draft.timeZone ?? "UTC"),
    };
}