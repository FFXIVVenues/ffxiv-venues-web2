import { hasTag } from "./filterFunctions/hasTag.ts";
import { hasPropValue } from "@/components/filterMenu/filters/filterFunctions/hasPropValue.ts";

import type { FilterOption } from "@/components/filterMenu/filters/filterOption.ts";

const nsfwMek = Symbol("nsfwMek");

export const featureFilters: FilterOption[] = [
  { name: "SFW on entry", mek: nsfwMek, filter: hasPropValue("sfw", true), hint: "The venue disallows nudity or erotic content in the open, some adult language expected, nudity/erotic content may occur in private rooms." },
  { name: "NSFW on entry", mek: nsfwMek, filter: hasPropValue("sfw", false), hint: "The venue allows adult language, nudity or erotic content in the open." },
  { name: "Courtesans", filter: hasTag("courtesans"), hint: "The venue offers erotic role-play services in a consensual environment." },
  { name: "Gambling", filter: hasTag("gambling"), hint: "The venue offers various games of chance with set amounts of gils and house rules." },
  { name: "Artists", filter: hasTag("artists"), hint: "Artists are present in the venue to offer various custom artwork." },
  { name: "Dancers", filter: hasTag("dancers"), hint: "Dancers populate the venue to hype the party and/or host customers." },
  { name: "Bards", filter: hasTag("bards"), hint: "A bard provides theme-based or general music to entertain guest with a selection of songs." },
  { name: "Twitch DJ", filter: hasTag("twitch dj"), hint: "The venue hosts a DJ who provides music in twitch streams and hype the venue." },
  { name: "Sync DJ", filter: hasTag("sync dj"), hint: "The venue hosts a sync DJ who offers music via synchshells." },
  { name: "Tarot", filter: hasTag("tarot"), hint: "The venue hosts a Tarot Reader who offers to read drawn cards and provide insights about the possible meaning they hold." },
  { name: "Pillow talk", filter: hasTag("pillow"), hint: "The venue offers Pillows who provide a safe, confidential space to promote an SFW companionship for a limited time." },
  { name: "Photography", filter: hasTag("photography"), hint: "The venue hosts photographers who take venue snapshots or more complex gpose of patrons to display in the venue discord and create memories." },
  { name: "Open stage", filter: hasTag("open stage"), hint: "The venue offers the stage for a patron to perform to the audience." },
  { name: "Void", filter: hasTag("void"), hint: "The venue is build in a the void; created outside the walls of the house." },
  { name: "Stylists", filter: hasTag("stylists"), hint: "The venue hosts stylists who offer a variety of glamour services, including hair styling, makeup, and wardrobe assistance." },
  { name: "Performances", filter: hasTag("performances"), hint: "The venue offers unique schedule performances, this could be SFW (theater, synch dancers, etc) or NSFW (erotic voyeur shows, live BDSM, etc)." },
  { name: "Giveaways", filter: hasTag("giveaways"), hint: "The venue offers giveaways through various channels, in chat, twitch stream or discord." },
  { name: "VIP available", filter: hasTag("vip"), hint: "The venue offers various perks through VIP tiers. This could include free drinks, gpose, gambling perk or more." },
  { name: "LGBTQIA+ focused", filter: hasTag("LGBTQIA+"), hint: "The venue is a safe space focused on LGBTQIA+." },
  { name: "IC RP encouraged", filter: hasTag("rp heavy"), hint: "The venue encourages an environment for players to role play as their characters, though interacting as themselves is allowed." },
  { name: "IC RP only", filter: hasTag("ic rp only"), hint: "The venue offers an environment for players to role play as their characters only, and does not allow open interaction as themselves."  }
];
