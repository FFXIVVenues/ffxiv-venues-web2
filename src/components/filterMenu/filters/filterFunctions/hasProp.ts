import type { Venue } from "@/lib/model/venue.ts";

export const hasProp = (prop: keyof Venue, value?: any) =>
  (venue: Venue) =>
      venue[prop] !== null && venue[prop] !== undefined;
