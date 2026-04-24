import type { Venue } from "@/lib/model/venue.ts";

export const notHaveTag = (...args: string[]) =>
  (venue: Venue) =>
  {
    if (!venue.tags) return true;
    for (let tag of venue.tags) {
      if (!tag) continue;
      for (let arg of args) {
        if (tag.toLowerCase() === arg.toLowerCase())
          return false;
      }
    }
    return true;
  };
