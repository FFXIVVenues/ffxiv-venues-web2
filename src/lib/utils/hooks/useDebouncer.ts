import {useState} from "react";
import type {Nullable} from "@/lib/utils/nullable.ts";

export const useDebouncer = (timeout: number) => {
  const [ debouncer, setDebouncer ] = useState<Nullable<NodeJS.Timeout>>(null);
  return (fn: () => void) => {
    if (debouncer) debouncer.close();
    const delayedFn = setTimeout(fn, timeout);
    setDebouncer(delayedFn);
  };
}