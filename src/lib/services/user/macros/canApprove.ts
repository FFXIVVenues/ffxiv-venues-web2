import type {VenueDto} from "@/lib/services/venues2/dtos/venueDto.ts";
import { createFilter } from 'odata-v4-inmemory'
import {NoUser} from "@/lib/services/user/macros/getUser.ts";
import type {User} from "@/lib/services/user/dtos/user.ts";
import type {Authorization} from "@/lib/services/user/dtos/authorization.ts";

export const canApprove = (venue: VenueDto, user: User, authorization: Authorization) : boolean => {
  if (user == NoUser)
    return false;

  if (authorization == null)
    return false;

  const authQuery = authorization.editApproval;
  if (authQuery == null || authQuery == "false")
    return false;

  const filterFn = createFilter(authQuery);
  return filterFn(venue);
}
