import type { Venue } from "@/lib/model/venue.ts";

export const isDataCenter = (dataCenter: string) =>
  (venue: Venue) =>
    venue.location.dataCenter === dataCenter;
