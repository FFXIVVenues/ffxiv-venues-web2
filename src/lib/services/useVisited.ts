import {useEffect, useState} from "react";
import {visitedService} from "@/lib/services/visitedService.ts";

export const useVisited = (id : string) : [ visited: boolean, (visited: boolean) => void ] => {
  const [ visited, internalSetvisited ] = useState(visitedService.isVisited(id));
  useEffect(() => visitedService.observe(() => {
    internalSetvisited(visitedService.isVisited(id));
  }), [ id ]);
  const setIsVisited = (visited: boolean) => {
    visited ? visitedService.setVisited(id)
            : visitedService.removeVisited(id)
  }
  return [ visited, setIsVisited ];
}