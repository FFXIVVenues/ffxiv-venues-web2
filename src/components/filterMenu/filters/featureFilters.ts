import { hasTag } from "./filterFunctions/hasTag.ts";
import { hasPropValue } from "@/components/filterMenu/filters/filterFunctions/hasPropValue.ts";

import type { FilterOption } from "@/components/filterMenu/filters/filterOption.ts";
import {msg} from "@lingui/core/macro";

const nsfwMek = Symbol("nsfwMek");

export const featureFilters: FilterOption[] = [
  { name: msg`SFW on entry`, mek: nsfwMek, filter: hasPropValue("sfw", true), hint: msg`The venue disallows nudity or erotic content in the open, some adult language expected, nudity/erotic content may occur in private rooms.` },
  { name: msg`NSFW on entry`, mek: nsfwMek, filter: hasPropValue("sfw", false), hint: msg`The venue allows adult language, nudity or erotic content in the open.` },
  { name: msg`Courtesans`, filter: hasTag("courtesans"), hint: msg`The venue offers erotic role-play services in a consensual environment.` },
  { name: msg`Gambling`, filter: hasTag("gambling"), hint: msg`The venue offers various games of chance with set amounts of gils and house rules.` },
  { name: msg`Artists`, filter: hasTag("artists"), hint: msg`Artists are present in the venue to offer various custom artwork.` },
  { name: msg`Dancers`, filter: hasTag("dancers"), hint: msg`Dancers populate the venue to hype the party and/or host customers.` },
  { name: msg`Bards`, filter: hasTag("bards"), hint: msg`A bard provides theme-based or general music to entertain guests with a selection of songs.` },
  { name: msg`Twitch DJ`, filter: hasTag("twitch dj"), hint: msg`The venue hosts a DJ who provides music in twitch streams and hype the venue.` },
  { name: msg`Sync DJ`, filter: hasTag("sync dj"), hint: msg`The venue hosts a sync DJ who offers music via synchshells.` },
  { name: msg`Tarot`, filter: hasTag("tarot"), hint: msg`The venue hosts a Tarot Reader who offers to read drawn cards and provide insights about the possible meaning they hold.` },
  { name: msg`Pillow talk`, filter: hasTag("pillow"), hint: msg`The venue offers Pillows who provide a safe, confidential space to promote an SFW companionship for a limited time.` },
  { name: msg`Photography`, filter: hasTag("photography"), hint: msg`The venue hosts photographers who take venue snapshots or more complex gpose of patrons to display in the venue discord and create memories.` },
  { name: msg`Open stage`, filter: hasTag("open stage"), hint: msg`The venue offers the stage for a patron to perform to the audience.` },
  { name: msg({message: `Void`, comment: `Venue built in the housing void`}), filter: hasTag("void"), hint: msg`The venue is built in the void; created outside the walls of the house.` },
  { name: msg`Stylists`, filter: hasTag("stylists"), hint: msg`The venue hosts stylists who offer a variety of glamour services, including hair styling, makeup, and wardrobe assistance.` },
  { name: msg`Performances`, filter: hasTag("performances"), hint: msg`The venue offers unique schedule performances, this could be SFW (theater, synch dancers, etc) or NSFW (erotic voyeur shows, live BDSM, etc).` },
  { name: msg`Giveaways`, filter: hasTag("giveaways"), hint: msg`The venue offers giveaways through various channels, in chat, twitch stream or discord.` },
  { name: msg`Syncshell available`, filter: hasTag("syncshell available"), hint: msg`The venue has a syncshell available for guests to join and see each other as they see themselves.`},
  { name: msg`VIP available`, filter: hasTag("vip"), hint: msg`The venue offers various perks through VIP tiers. This could include free drinks, gpose, gambling perk or more.` },
  { name: msg`LGBTQIA+ focused`, filter: hasTag("LGBTQIA+"), hint: msg`The venue is a safe space focused on LGBTQIA+.` },
  { name: msg`IC RP encouraged`, filter: hasTag("rp heavy"), hint: msg`The venue encourages an environment for players to role play as their characters, though interacting as themselves is allowed.` },
  { name: msg`IC RP only`, filter: hasTag("ic rp only"), hint: msg`The venue offers an environment for players to role play as their characters only, and does not allow open interaction as themselves.`  },
  { name: msg`24/7 open house`, filter: hasTag("24/7 open house"), hint: msg`The venue allows anyone to visit at anytime, even outside of any scheduled hours`}
];
