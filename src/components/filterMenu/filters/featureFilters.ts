import { hasTag } from "./filterFunctions/hasTag.ts";
import { hasPropValue } from "@/components/filterMenu/filters/filterFunctions/hasPropValue.ts";
import type { FilterOption } from "./categoryFilters.ts";

export const featureFilters: FilterOption[] = [
  { name: "SFW on entry", filter: hasPropValue("sfw", true) },
  { name: "NSFW on entry", filter: hasPropValue("sfw", false) },
  { name: "Gambling", filter: hasTag("gambling") },
  { name: "Artists", filter: hasTag("artists") },
  { name: "Dancers", filter: hasTag("dancers") },
  { name: "Bards", filter: hasTag("bards") },
  { name: "Twitch DJ", filter: hasTag("twitch dj") },
  { name: "Sync DJ", filter: hasTag("sync dj") },
  { name: "Tarot", filter: hasTag("tarot") },
  { name: "LGBTQIA+ focused", filter: hasTag("LGBTQIA+") },
  { name: "Pillow talk", filter: hasTag("pillow") },
  { name: "Photography", filter: hasTag("photography") },
  { name: "Open stage", filter: hasTag("open stage") },
  { name: "Stylists", filter: hasTag("stylists") },
  { name: "Performances", filter: hasTag("performances") },
  { name: "VIP available", filter: hasTag("vip") },
  { name: "Triple triad", filter: hasTag("triple triad") },
  { name: "Courtesans", filter: hasTag("courtesans") },
  { name: "RP Heavy", filter: hasTag("rp heavy", "ic rp only") }
];
