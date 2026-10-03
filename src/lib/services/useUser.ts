import {request, useEnv} from "@/lib/utils";
import type {User} from "@/lib/model/user.ts";
import {useEffect, useState} from "react";

export const useUser = () => {
  const [ user, setUser ] = useState<User | null>(null);

  useEffect(() => {
    const whoami = useEnv("FFXIV_VENUES_API_ROOT") + "/auth/whoami";
    request(whoami, { credentials: 'include' })
      .then(response => response.json() as Promise<User>)
      .then(setUser)
      .catch();
  }, [])

  return user;
}