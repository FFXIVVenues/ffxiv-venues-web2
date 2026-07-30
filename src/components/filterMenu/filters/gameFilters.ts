import { hasTag } from "./filterFunctions/hasTag.ts";
import { msg } from "@lingui/core/macro";

import type { FilterOption } from "@/components/filterMenu/filters/filterOption.ts";

export const gameFilters: FilterOption[] = [
  { name: msg`Triple triad`, filter: hasTag("triple triad"), hint: msg`The venue offers individual or competitive games of Triple Triad via the game interface itself.` },
  { name: msg`Truth or dare`, filter: hasTag("truth or dare"), hint: msg`The venue offers a game of Truth or Dare for whomever feels like joining. Sometimes in private alliance, sometimes venue wide.` },
  { name: msg`Blackjack`, filter: hasTag("blackjack"), hint: msg`The venue holds a table for players who wish to gamble gil in a game of 21.` },
  { name: msg`Deathroll`, filter: hasTag("deathroll"), hint: msg`The venue offers individual or competitive game of Deathroll usually with prizes involved.` },
  { name: msg`Texas holdem`, filter: hasTag("texas holdem"), hint: msg`The venue holds a table for players who wish to gamble gil in a game of Texas holdem.` },
  { name: msg`Bingo`, filter: hasTag("bingo"), hint: msg`The venue holds a venue wide bingo game, usually with prizes involved.` },
  { name: msg`Roulette`, filter: hasTag("roulette"), hint: msg`The venue holds a table for players who wish to gamble gil in a game of Roulette.` },
];
