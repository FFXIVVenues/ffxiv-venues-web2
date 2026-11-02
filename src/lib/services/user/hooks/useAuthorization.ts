import {useEffect, useState} from "react";
import type {Authorization} from "@/lib/services/user/dtos/authorization.ts";
import type {Nullable} from "@/lib/utils/nullable.ts";
import {getAuthorization, NoAuthorization} from "@/lib/services/user/macros/getAuthorization.ts";

export const useAuthorization = () : Nullable<Authorization> => {
  const [ authorization, setAuthorization ] = useState<Nullable<Authorization>>(null);

  useEffect(() => {
    getAuthorization()
      .then(setAuthorization)
      .catch(_ => setAuthorization(NoAuthorization));
  }, []);

  return authorization;
}