import type { Venue } from "@/lib/model/venue.ts";

export const hasTag = (...args: string[]) =>
  (venue: Venue) =>
  {
    if (!venue.tags) return false;
    for (let tag of venue.tags) {
      if (!tag) continue;
      for (let arg of args) {
        if (tag.toLowerCase() === arg.toLowerCase())
          return true;
      }
    }
    return false;
  };
