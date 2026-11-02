import type {VenueDto} from "@/lib/services/venues2/dtos/venueDto.ts";
import { createFilter } from 'odata-v4-inmemory'
import type {User} from "@/lib/services/user/dtos/user.ts";
import type {Authorization} from "@/lib/services/user/dtos/authorization.ts";
import {NoUser} from "@/lib/services/user/macros/getUser.ts";

export const canEdit = (venue: VenueDto, user: User, authorization: Authorization) : boolean => {
  if (user == NoUser)
    return false;

  if (venue.managers.indexOf(user.userId) !== -1)
    return true;

  const authQuery = authorization?.edit;
  if (authQuery == null || authQuery == "false")
    return false;

  const filterFn = createFilter(authQuery);
  return filterFn(venue);
}
