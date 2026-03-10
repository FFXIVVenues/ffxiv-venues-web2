import type {FilterOption} from "./categoryFilters.ts";
import {favouritesService} from "@/lib/services/favouritesService.ts";
import {visitedService} from "@/lib/services/visitedService.ts";

export const ratingFilters: FilterOption[] = [
  { name: "Is Favorited", filter: (v) => favouritesService.isFavourite(v.id) },
  { name: "Visited", filter: (v) => visitedService.isVisited(v.id) },
  { name: "Not visited", filter: (v) => !visitedService.isVisited(v.id) }
];
