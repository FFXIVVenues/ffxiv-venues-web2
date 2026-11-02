import {getUser} from "@/lib/services/user/macros/getUser.ts";
import {type ReactNode, use} from "react";
import {Navigate} from "react-router";
import {getAuthorization} from "@/lib/services/user/macros/getAuthorization.ts";
import {isStaff} from "@/lib/services/user/macros/isStaff.ts";

export const RequireStaff = ({ children }: { children: ReactNode }) => {
  const user = use(getUser());
  const authorization = use(getAuthorization());
  const staff = isStaff(user, authorization);

  return !staff
    ? <Navigate to="/" replace />
    : <>{children}</>;
}