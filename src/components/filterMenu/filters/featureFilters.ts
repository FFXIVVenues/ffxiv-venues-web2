import { hasTag } from "./filterFunctions/hasTag.ts";
import { hasPropValue } from "@/components/filterMenu/filters/filterFunctions/hasPropValue.ts";

import type { FilterOption } from "@/components/filterMenu/filters/filterOption.ts";

const nsfwMek = Symbol("nsfwMek");

export const featureFilters: FilterOption[] = [
  { name: "SFW on entry", mek: nsfwMek, filter: hasPropValue("sfw", true) },
  { name: "NSFW on entry", mek: nsfwMek, filter: hasPropValue("sfw", false) },
  { name: "Courtesans", filter: hasTag("courtesans") },
  { name: "Gambling", filter: hasTag("gambling") },
  { name: "Artists", filter: hasTag("artists") },
  { name: "Dancers", filter: hasTag("dancers") },
  { name: "Bards", filter: hasTag("bards") },
  { name: "Twitch DJ", filter: hasTag("twitch dj") },
  { name: "Sync DJ", filter: hasTag("sync dj") },
  { name: "Tarot", filter: hasTag("tarot") },
  { name: "Pillow talk", filter: hasTag("pillow") },
  { name: "Photography", filter: hasTag("photography") },
  { name: "Open stage", filter: hasTag("open stage") },
  { name: "Void", filter: hasTag("void") },
  { name: "Stylists", filter: hasTag("stylists") },
  { name: "Performances", filter: hasTag("performances") },
  { name: "Giveaways", filter: hasTag("giveaways") },
  { name: "VIP available", filter: hasTag("vip") },
  { name: "LGBTQIA+ focused", filter: hasTag("LGBTQIA+") },
  { name: "IC RP encouraged", filter: hasTag("rp heavy") },
  { name: "IC RP only", filter: hasTag("ic rp only") }
];
