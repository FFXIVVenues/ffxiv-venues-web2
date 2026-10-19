import {request, useEnv} from "@/lib/utils";
import {useEffect, useState} from "react";
import type {Authorization} from "@/lib/services/user/dtos/authorization.ts";
import type {Nullable} from "@/lib/utils/nullable.ts";

const whatcanido = useEnv("FFXIV_VENUES_API_ROOT") + "/auth/whatcanido";
const authPromise = request(whatcanido, { credentials: 'include' })
  .then(response => response.json() as Promise<Authorization>);

export const useAuthorization = () : Nullable<Authorization> => {
  const [ authorization, setAuthorization ] = useState<Nullable<Authorization>>(null);

  useEffect(() => {
    authPromise
      .then(setAuthorization)
      .catch(_ => setAuthorization(NoAuthorization));
  }, []);

  return authorization;
}

export const NoAuthorization : Authorization = {
  edit: "false",
  editApproval: "false",
  editManagers: "false",
  delete: "false",
  unlimitedSchedules: false
}
