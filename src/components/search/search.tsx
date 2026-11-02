import {FieldLabel} from "@/components/ui/shadcn/field.tsx";
import {Trans} from "@lingui/react/macro";
import {Input} from "@/components/ui/shadcn/input.tsx";
import {t} from "@lingui/core/macro";
import React, {type ChangeEvent, useCallback} from "react";
import {useDebouncer} from "@/lib/utils/hooks/useDebouncer.ts";

export const Search = ({ onSearch }: { onSearch: (search: string) => void}) => {
  const searchDebouncer = useDebouncer(1000);
  const searchFilterCallback = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const search = (e.target as HTMLInputElement).value;
    searchDebouncer(() => search.length >= 2 && onSearch(search))
  }, [onSearch]);

  return <>
    <FieldLabel htmlFor="search-venues" className="sr-only"><Trans>Search venues</Trans></FieldLabel>
    <Input id="search-venues"
         type="text"
         placeholder={t`Search venues`}
         onChange={searchFilterCallback} />
    </>

}
