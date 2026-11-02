import {useAuthorization} from "@/lib/services/user/hooks/useAuthorization.ts";
import type {VenueDto} from "@/lib/services/venues2/dtos/venueDto.ts";
import type {Nullable} from "@/lib/utils/nullable.ts";
import {NoUser} from "@/lib/services/user/macros/getUser.ts";
import {useUser} from "@/lib/services/user/hooks/useUser.ts";
import {canEditManagers} from "@/lib/services/user/macros/canEditManagers.ts";

export const useCanEditManagers = (venue: Nullable<VenueDto>) : Nullable<boolean> => {
  const user  = useUser();
  const authorization = useAuthorization();

  if (user == null || venue == null || authorization == null)
    return null;

  if (user == NoUser)
    return false;

  return canEditManagers(venue, user, authorization);
}
