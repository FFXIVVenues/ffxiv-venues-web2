import { hasTag } from "./filterFunctions/hasTag.ts";

import type { FilterOption } from "@/components/filterMenu/filters/filterOption.ts";

export const gameFilters: FilterOption[] = [
  { name: "Triple triad", filter: hasTag("triple triad") },
  { name: "Truth or dare", filter: hasTag("truth or dare") },
  { name: "Blackjack", filter: hasTag("blackjack") },
  { name: "Deathroll", filter: hasTag("deathroll") },
  { name: "Texas holdem", filter: hasTag("texas holdem") },
  { name: "Bingo", filter: hasTag("bingo") },
  { name: "Roulette", filter: hasTag("roulette") },
];
