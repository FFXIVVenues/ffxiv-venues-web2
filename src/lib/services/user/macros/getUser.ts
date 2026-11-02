import {request, useEnv} from "@/lib/utils";
import {type User} from "@/lib/services/user/dtos/user.ts";

const whoami = useEnv("FFXIV_VENUES_API_ROOT") + "/auth/whoami";
const userPromise = request(whoami, { credentials: 'include' })
  .then(response => response.json() as Promise<User>)
  .catch(error => {
    console.error(error);
    return NoUser
  });

export const getUser = () => userPromise;

export const NoUser : User = {
  userId: "",
  username: "nouser",
  nickname: "No user"
}