import {hasTag} from "./filterFunctions/hasTag.ts";
import {notHaveTag} from "./filterFunctions/notHaveTag.ts";
import type {FilterOption} from "@/components/filterMenu/filters/filterOption.ts";
import {msg} from "@lingui/core/macro";

const nightclubMek = Symbol("nightclubmek");
const bathhouseMek = Symbol("bathhousemek");

export const sceneFilters: FilterOption[] = [
  { name: msg`Nightclub`, filter: hasTag("nightclub"), mek: nightclubMek },
  { name: msg`Den`, filter: hasTag("den") },
  { name: msg`Cafe`, filter: hasTag("cafe") },
  { name: msg`Tavern`, filter: hasTag("tavern") },
  { name: msg`Inn`, filter: hasTag("inn") },
  { name: msg`Lounge`, filter: hasTag("lounge") },
  { name: msg`Restaurant`, filter: hasTag("restaurant") },
  { name: msg`Fight club`, filter: hasTag("fightclub") },
  { name: msg`Casino`, filter: hasTag("casino") },
  { name: msg`Shop`, filter: hasTag("shop") },
  { name: msg`Maid cafe / host club`, filter: hasTag("maid cafe", "host club") },
  { name: msg`Bath house`, filter: hasTag("bath house"), mek: bathhouseMek },
  { name: msg({message: `Other`, comment: `Venue type: none of the listed categories`}), filter: hasTag("other") },
  { name: msg`Not nightclub`, filter: notHaveTag("nightclub"), mek: nightclubMek },
  { name: msg`Not bath house`, filter: notHaveTag("bath house"), mek: bathhouseMek }
];
