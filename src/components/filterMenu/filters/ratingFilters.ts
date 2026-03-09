import type {FilterOption} from "./categoryFilters.ts";
import {favouritesService} from "@/lib/services/favouritesService.ts";

export const ratingFilters: FilterOption[] = [
  { name: "Is Favorited", filter: (v) => favouritesService.isFavourite(v.id) }
];
