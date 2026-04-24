import {hasTag} from "./filterFunctions/hasTag.ts";
import {notHaveTag} from "./filterFunctions/notHaveTag.ts";
import type {FilterOption} from "@/components/filterMenu/filters/filterOption.ts";

const nightclubMek = Symbol("nightclubmek");
const bathhouseMek = Symbol("bathhousemek");

export const sceneFilters: FilterOption[] = [
  { name: "Nightclub", filter: hasTag("nightclub"), mek: nightclubMek },
  { name: "Den", filter: hasTag("den") },
  { name: "Cafe", filter: hasTag("cafe") },
  { name: "Tavern", filter: hasTag("tavern") },
  { name: "Inn", filter: hasTag("inn") },
  { name: "Lounge", filter: hasTag("lounge") },
  { name: "Restaurant", filter: hasTag("restaurant") },
  { name: "Fight club", filter: hasTag("fightclub") },
  { name: "Casino", filter: hasTag("casino") },
  { name: "Shop", filter: hasTag("shop") },
  { name: "Maid cafe / host club", filter: hasTag("maid cafe", "host club") },
  { name: "Bath house", filter: hasTag("bath house"), mek: bathhouseMek },
  { name: "Other", filter: hasTag("other") },
  { name: "Not nightclub", filter: notHaveTag("nightclub"), mek: nightclubMek },
  { name: "Not bath house", filter: notHaveTag("bath house"), mek: bathhouseMek }
];
