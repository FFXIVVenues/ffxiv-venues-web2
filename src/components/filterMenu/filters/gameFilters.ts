import { hasTag } from "./filterFunctions/hasTag.ts";

import type { FilterOption } from "@/components/filterMenu/filters/filterOption.ts";

export const gameFilters: FilterOption[] = [
  { name: "Triple triad", filter: hasTag("triple triad"), hint: "The venue offers individual or competitive games of Triple Triad via the game interface itself." },
  { name: "Truth or dare", filter: hasTag("truth or dare"), hint: "The venue offers a game of Truth or Dare for whomever feels like joining. Sometimes in private alliance, sometimes venue wide." },
  { name: "Blackjack", filter: hasTag("blackjack"), hint: "The venue holds table for players who wish to gamble gil in a game of 21." },
  { name: "Deathroll", filter: hasTag("deathroll"), hint: "The venue offers individual or competitive game of Deathroll usually with prizes involved." },
  { name: "Texas holdem", filter: hasTag("texas holdem"), hint: "The venue holds table for players who wish to gamble gil in a game of Texas holdem." },
  { name: "Bingo", filter: hasTag("bingo"), hint: "The venue holds a venue wide bingo game, usually with prizes involved." },
  { name: "Roulette", filter: hasTag("roulette"), hint: "The venue holds table for players who wish to gamble gil in a game of Roulette." },
];
