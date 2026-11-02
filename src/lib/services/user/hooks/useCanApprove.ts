import {useAuthorization} from "@/lib/services/user/hooks/useAuthorization.ts";
import type {VenueDto} from "@/lib/services/venues2/dtos/venueDto.ts";
import {useUser} from "@/lib/services/user/hooks/useUser.ts";
import type {Nullable} from "@/lib/utils/nullable.ts";
import {canApprove} from "@/lib/services/user/macros/canApprove.ts";

export const useCanApprove = (venue: VenueDto) : Nullable<boolean> => {
  const user = useUser();
  const authorization = useAuthorization();

  if (user == null || venue == null || authorization == null)
    return null;

  return canApprove(venue, user, authorization);
}
