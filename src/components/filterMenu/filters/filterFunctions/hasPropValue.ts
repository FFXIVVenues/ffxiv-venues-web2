import type { Venue } from "@/lib/model/venue.ts";

export const hasPropValue = (prop: keyof Venue, value: any) =>
  (venue: Venue) =>
    venue[prop] === value;
