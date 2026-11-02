import {getUser, NoUser} from "@/lib/services/user/macros/getUser.ts";
import {type ReactNode, use} from "react";
import {Navigate} from "react-router";

export const RequireUser = ({ children }: { children: ReactNode }) => {
  const user = use(getUser());
  return !user || user === NoUser
    ? <Navigate to="/" replace />
    : <>{children}</>;
}