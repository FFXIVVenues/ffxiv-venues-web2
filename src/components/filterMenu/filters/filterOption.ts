import type {ReactNode} from "react";
import type {MessageDescriptor} from "@lingui/core";
import type {VenueFilter} from "@/lib/services/venues/venueFilter.ts";

export type FilterOption = {
  icon?: ReactNode;
  name: string | MessageDescriptor;
  mek?: Symbol,
  hint?: string | MessageDescriptor
} & (
  | { options?: FilterOption[], filter: VenueFilter; }
  | { options: FilterOption[], filter?: VenueFilter; }
  );