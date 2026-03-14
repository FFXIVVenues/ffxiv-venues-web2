import {useRef, useCallback, memo, type ChangeEvent} from "react";
import type {Venue} from "@/lib/model/venue.ts";
import {SidebarGroup} from "@/components/ui/sidebar.tsx";
import {FieldLabel} from "@/components/ui/field.tsx";
import {Input} from "@/components/ui/input.tsx";
import {FilterGroup} from "@/components/filterMenu/filterGroup.tsx";

import {categoryFilters} from "./filters/categoryFilters.ts";
import {featureFilters} from "./filters/featureFilters.ts";
import {worldFilters} from "@/components/filterMenu/filters/worldFilters.ts";
import {ratingFilters} from "@/components/filterMenu/filters/ratingFilters.tsx";

export type Filter = (venue: Venue) => boolean;
export type FilterMenuProps = {
    onFilter: (filters: Filter[]) => void;
}

export const FilterMenu = memo(({ onFilter }: FilterMenuProps) => {
    const filterRef = useRef({
        search: null as string | null,
        regionFilters: [] as Filter[],
        categoryFilters: [] as Filter[],
        featureFilters: [] as Filter[],
        ratingFilters: [] as Filter[]
    });

    const updateFilters = useCallback((update: Partial<typeof filterRef.current>) => {
        filterRef.current = { ...filterRef.current, ...update };
        const filters = [
            ...filterRef.current.regionFilters,
            ...filterRef.current.categoryFilters,
            ...filterRef.current.featureFilters,
            ...filterRef.current.ratingFilters
        ]
        const searchText = filterRef.current.search?.toLowerCase();
        if (searchText && searchText.length > 0)
            filters.push((v: Venue) =>
                v.name.toLowerCase().includes(searchText));
        onFilter(filters);
    }, [onFilter]);

    const searchFilter = useCallback((e: ChangeEvent<HTMLInputElement>) => updateFilters({ search: e.target.value }), []);
    const regionsFilter = useCallback((filters: Filter[]) => updateFilters({ regionFilters: filters }), []);
    const categorryFilter = useCallback((filters: Filter[]) => updateFilters({ categoryFilters: filters }), []);
    const featuresFilter = useCallback((filters: Filter[]) => updateFilters({ featureFilters: filters }), []);
    const ratingFilter = useCallback((filters: Filter[]) => updateFilters({ ratingFilters: filters }), []);

    return <>
        <SidebarGroup>
            <FieldLabel htmlFor="search-venues" className="sr-only">Search venues</FieldLabel>
            <Input id="search-venues"
                   type="text"
                   placeholder="Search venues"
                   onChange={searchFilter} />
        </SidebarGroup>

        <FilterGroup
            heading="Regions"
            defaultOpen={true}
            options={worldFilters}
            singleSelect={true}
            onFilter={regionsFilter} />

        <FilterGroup
            heading="Scenes"
            defaultOpen={false}
            options={categoryFilters}
            onFilter={categorryFilter} />

        <FilterGroup
            heading="Features"
            defaultOpen={false}
            options={featureFilters}
            onFilter={featuresFilter} />

        <FilterGroup
          heading="Rating"
          defaultOpen={false}
          singleSelect={true}
          options={ratingFilters}
          onFilter={ratingFilter} />

    </>

});
