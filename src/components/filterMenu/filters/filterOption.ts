import type {ReactNode} from "react";
import type {VenueFilter} from "@/lib/services/venues/venueFilter.ts";

export type FilterOption = {
  icon?: ReactNode;
  name: string | ReactNode;
  mek?: Symbol
} & (
  | { options?: FilterOption[], filter: VenueFilter; }
  | { options: FilterOption[], filter?: VenueFilter; }
  );