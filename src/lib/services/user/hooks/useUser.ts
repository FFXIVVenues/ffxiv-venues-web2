import {useEffect, useState} from "react";
import type {User} from "@/lib/services/user/dtos/user.ts";
import {getUser, NoUser} from "@/lib/services/user/macros/getUser.ts";

export const useUser = () => {
  const [ user, setUser ] = useState<User | null>(null);

  useEffect(() => {
    getUser()
      .then(setUser)
      .catch(_ => setUser(NoUser));
  }, [])

  return user;
}