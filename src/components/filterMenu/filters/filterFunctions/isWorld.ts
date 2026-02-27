import type { Venue } from "@/lib/model/venue.ts";

export const isWorld = (world: string) =>
  (venue: Venue) =>
    venue.location.world === world;
