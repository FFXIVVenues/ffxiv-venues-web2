import { hasTag } from "./filterFunctions/hasTag.ts";
import { hasPropValue } from "@/components/filterMenu/filters/filterFunctions/hasPropValue.ts";

import type { FilterOption } from "@/components/filterMenu/filters/filterOption.ts";

const nsfwMek = Symbol("nsfwMek");

export const featureFilters: FilterOption[] = [
  { name: "SFW on entry", mek: nsfwMek, filter: hasPropValue("sfw", true), hint: "The venue disallows nudity or erotic content in the open, some adult language expected, nudity/erotic content may occur in private rooms." },
  { name: "NSFW on entry", mek: nsfwMek, filter: hasPropValue("sfw", false), hint: "The venue allows nudity and erotic content in the open." },
  { name: "Courtesans", filter: hasTag("courtesans"), hint: "The venue offers adult erotic roleplaying services." },
  { name: "Gambling", filter: hasTag("gambling"), hint: "The venue offers gil gambling services." },
  { name: "Artists", filter: hasTag("artists"), hint: "The venue has artists willing to daw you on staff" },
  { name: "Dancers", filter: hasTag("dancers"), hint: "" },
  { name: "Bards", filter: hasTag("bards"), hint: "" },
  { name: "Twitch DJ", filter: hasTag("twitch dj"), hint: "" },
  { name: "Sync DJ", filter: hasTag("sync dj"), hint: "" },
  { name: "Tarot", filter: hasTag("tarot"), hint: "" },
  { name: "Pillow talk", filter: hasTag("pillow"), hint: "" },
  { name: "Photography", filter: hasTag("photography"), hint: "" },
  { name: "Open stage", filter: hasTag("open stage"), hint: "" },
  { name: "Void", filter: hasTag("void"), hint: "" },
  { name: "Stylists", filter: hasTag("stylists"), hint: "" },
  { name: "Performances", filter: hasTag("performances"), hint: "" },
  { name: "Giveaways", filter: hasTag("giveaways"), hint: "" },
  { name: "VIP available", filter: hasTag("vip"), hint: "" },
  { name: "LGBTQIA+ focused", filter: hasTag("LGBTQIA+"), hint: "" },
  { name: "IC RP encouraged", filter: hasTag("rp heavy"), hint: "" },
  { name: "IC RP only", filter: hasTag("ic rp only"), hint: ""  }
];
