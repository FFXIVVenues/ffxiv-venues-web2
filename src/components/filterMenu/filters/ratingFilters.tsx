import type {FilterOption} from "./categoryFilters.ts";
import {favouritesService} from "@/lib/services/favouritesService.ts";
import {visitedService} from "@/lib/services/visitedService.ts";
import {ratingsService} from "@/lib/services/ratingsService.ts";
import {CheckIcon, HeartIcon, StarIcon} from "lucide-react";

export const ratingFilters: FilterOption[] = [
  { icon: <HeartIcon fill="currentColor" />, name: "Favorited", filter: (v) => favouritesService.isFavourite(v.id) },
  { icon: <CheckIcon strokeWidth="4" />, name: "Visited", filter: (v) => visitedService.isVisited(v.id) },
  { icon: <StarIcon fill="currentColor" />, name: "5 Stars", filter: (v) => ratingsService.getRating(v.id) >= 5 },
  { icon: <StarIcon fill="currentColor" />, name: "4+ Stars", filter: (v) => ratingsService.getRating(v.id) >= 4 },
  { icon: <StarIcon fill="currentColor" />, name: "3+ Stars", filter: (v) => ratingsService.getRating(v.id) >= 3 },
  { icon: <StarIcon fill="currentColor" />, name: "2+ Stars", filter: (v) => ratingsService.getRating(v.id) >= 2 },
  { icon: <StarIcon fill="currentColor" />, name: "1+ Stars", filter: (v) => ratingsService.getRating(v.id) >= 1 },
  { icon: <StarIcon fill="currentColor" />, name: "Unrated", filter: (v) => ratingsService.getRating(v.id) === 0 }
];
