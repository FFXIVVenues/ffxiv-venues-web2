import {request, useEnv} from "@/lib/utils";
import type {Authorization} from "@/lib/services/user/dtos/authorization.ts";

const whatcanido = useEnv("FFXIV_VENUES_API_ROOT") + "/auth/whatcanido";
const authPromise = request(whatcanido, { credentials: 'include' })
  .then(response => response.json() as Promise<Authorization>)
  .catch(error => {
    console.error(error);
    return NoAuthorization
  });

export const getAuthorization = () => authPromise;

export const NoAuthorization : Authorization = {
  edit: "false",
  editApproval: "false",
  editManagers: "false",
  delete: "false",
  unlimitedSchedules: false
}
