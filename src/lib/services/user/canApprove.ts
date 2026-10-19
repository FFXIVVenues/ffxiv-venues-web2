import {useAuthorization} from "@/lib/services/user/useAuthorization.ts";
import type {VenueDto} from "@/lib/services/venues2/dtos/venueDto.ts";
import {NoUser, useUser} from "@/lib/services/user/useUser.ts";
import { createFilter } from 'odata-v4-inmemory'
import type {Nullable} from "@/lib/utils/nullable.ts";

export const canApprove = (venue: VenueDto) : Nullable<boolean> => {
  const user = useUser();
  const authorization = useAuthorization();

  if (user == null)
    return null;

  if (user == NoUser)
    return false;

  const authQuery = authorization?.editApproval;
  if (authQuery == null || authQuery == "false")
    return false;

  const filterFn = createFilter(authQuery);
  return filterFn(venue);
}
