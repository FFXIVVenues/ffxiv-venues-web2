import {useEffect, useState} from "react";
import {ratingsService} from "@/lib/services/ratingsService.ts";

export const useRating = (id : string) : [ rating: number, (rating: number) => void ] => {
  const [ rating, internalSetRating ] = useState(ratingsService.getRating(id));
  useEffect(() => ratingsService.observe(() => {
    internalSetRating(ratingsService.getRating(id));
  }), [ id ]);
  const setRating = (rating: number) => {
    if (rating === ratingsService.getRating(id)){
      ratingsService.removeRating(id);
    } else{
      ratingsService.setRating(id, rating);
    }
  }
  return [ rating, setRating ];
}