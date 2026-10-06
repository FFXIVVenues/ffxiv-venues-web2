import {useEffect, useState} from "react";
import {favouritesService} from "@/lib/services/favorites/favoritesService.ts";

export const isFavorite = (id : string) : [ favourited: boolean, (favourited: boolean) => void ] => {
  const [ internalIsFavorite, internalSetFavourited ] = useState(favouritesService.isFavourite(id));
  useEffect(() => favouritesService.observe(() => {
      internalSetFavourited(favouritesService.isFavourite(id));
  }), [ id ]);
  const setIsFavourite = (favorite: boolean) => {
    favorite ? favouritesService.setFavourite(id)
             : favouritesService.removeFavourite(id)
  }
  return [ internalIsFavorite, setIsFavourite ];
}