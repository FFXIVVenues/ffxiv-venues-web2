import {request, useEnv} from "@/lib/utils";
import {type User} from "@/lib/services/user/dtos/user.ts";
import {useEffect, useState} from "react";

const whoami = useEnv("FFXIV_VENUES_API_ROOT") + "/auth/whoami";
const userPromise = request(whoami, { credentials: 'include' })
  .then(response => response.json() as Promise<User>);

export const useUser = () => {
  const [ user, setUser ] = useState<User | null>(null);

  useEffect(() => {
    userPromise
      .then(setUser)
      .catch(_ => setUser(NoUser));
  }, [])

  return user;
}

export const NoUser : User = {
  userId: "",
  username: "nouser",
  nickname: "No user"
}