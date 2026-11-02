import type {Nullable} from "@/lib/utils/nullable.ts";
import type {Authorization} from "@/lib/services/user/dtos/authorization.ts";
import type {User} from "@/lib/services/user/dtos/user.ts";
import {NoUser} from "@/lib/services/user/macros/getUser.ts";

export const isStaff = (user: User, authorization: Authorization) : Nullable<boolean> => {
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
