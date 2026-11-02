import {useAuthorization} from "@/lib/services/user/hooks/useAuthorization.ts";
import {useUser} from "@/lib/services/user/hooks/useUser.ts";
import {isStaff} from "@/lib/services/user/macros/isStaff.ts";
import type {Nullable} from "@/lib/utils/nullable.ts";

export const useIsStaff = () : Nullable<boolean> => {
  const user = useUser();
  const authorization = useAuthorization();

  if (user == null || authorization == null)
    return null;

  return isStaff(user, authorization);
}
