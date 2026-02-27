import type { Venue } from "@/lib/model/venue.ts";

export const propNotNull = (prop: keyof Venue) =>
  (venue: Venue) => venue[prop] !== null && venue[prop] !== undefined;
