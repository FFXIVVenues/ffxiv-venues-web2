import {useEffect, useState} from "react";

export const usePersistedState = <T>(key: string, initial: T) => {
  const internalKey = "aether-venues-"+key;
  const [value, setValue] = useState<T>(() => {
    try {
      const v = localStorage.getItem(internalKey);
      return v !== null ? JSON.parse(v) : initial;
    } catch { return initial; }
  });

  useEffect(() => {
    try { localStorage.setItem(internalKey, JSON.stringify(value)); } catch {}
  }, [internalKey, value]);

  return [value, setValue] as const;
}