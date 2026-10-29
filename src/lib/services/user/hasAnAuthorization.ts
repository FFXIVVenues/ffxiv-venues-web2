import {useAuthorization} from "@/lib/services/user/useAuthorization.ts";
import type {VenueDto} from "@/lib/services/venues2/dtos/venueDto.ts";
import {NoUser, useUser} from "@/lib/services/user/useUser.ts";
import { createFilter } from 'odata-v4-inmemory'
import type {Nullable} from "@/lib/utils/nullable.ts";

export const hasAnAuthorization = () : Nullable<boolean> => {
  const user = useUser();
  const authorization = useAuthorization();

  if (user == null)
    return null;

  if (authorization == null)
    return null;

  if (user == NoUser)
    return false;

  const check= (s: string) => s && s.length > 0 && s != "false";
  if (check(authorization.edit))
    return true;

  if (check(authorization.editApproval))
    return true;

  if (check(authorization.editManagers))
    return true;

  if (check(authorization.delete))
    return true;

  return false;
}
