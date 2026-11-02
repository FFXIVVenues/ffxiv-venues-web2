import {useAuthorization} from "@/lib/services/user/hooks/useAuthorization.ts";
import type {VenueDto} from "@/lib/services/venues2/dtos/venueDto.ts";
import {useUser} from "@/lib/services/user/hooks/useUser.ts";
import type {Nullable} from "@/lib/utils/nullable.ts";
import {canDelete} from "@/lib/services/user/macros/canDelete.ts";

export const useCanDelete = (venue: VenueDto) : Nullable<boolean> => {
  const user  = useUser();
  const authorization = useAuthorization();

  if (user == null || venue == null || authorization == null)
    return null;

  return canDelete(venue, user, authorization);
}
