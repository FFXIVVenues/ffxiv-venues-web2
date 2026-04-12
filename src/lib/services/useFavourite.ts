import {useEffect, useState} from "react";
import {favouritesService} from "@/lib/services/favouritesService.ts";

export const useFavourite = (id : string) : [ favourited: boolean, (favourited: boolean) => void ] => {
  const [ favourited, internalSetFavourited ] = useState(favouritesService.isFavourite(id));
  useEffect(() => favouritesService.observe(() => {
      internalSetFavourited(favouritesService.isFavourite(id));
  }), [ id ]);
  const setIsFavourite = (favourited: boolean) => {
    favourited ? favouritesService.setFavourite(id)
               : favouritesService.removeFavourite(id)
  }
  return [ favourited, setIsFavourite ];
}