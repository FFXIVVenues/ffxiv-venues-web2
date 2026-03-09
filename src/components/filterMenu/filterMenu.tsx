import {useRef, useCallback, memo} from "react";
import type {Venue} from "@/lib/model/venue.ts";
import {SidebarGroup} from "@/components/ui/sidebar.tsx";
import {FieldLabel} from "@/components/ui/field.tsx";
import {Input} from "@/components/ui/input.tsx";
import {FilterGroup} from "@/components/filterMenu/filterGroup.tsx";

import {categoryFilters} from "./filters/categoryFilters.ts";
import {featureFilters} from "./filters/featureFilters.ts";
import {worldFilters} from "@/components/filterMenu/filters/worldFilters.ts";

export type Filter = (venue: Venue) => boolean;
export type FilterMenuProps = {
    onFilter: (filters: Filter[]) => void;
}

export const FilterMenu = memo(({ onFilter }: FilterMenuProps) => {
    const filterRef = useRef({
        search: null as string | null,
        locationFilters: [] as Filter[],
        categoryFilters: [] as Filter[],
        featureFilters: [] as Filter[]
    });

    const updateFilters = useCallback((update: Partial<typeof filterRef.current>) => {
        filterRef.current = { ...filterRef.current, ...update };
        const filters = [
            ...filterRef.current.locationFilters,
            ...filterRef.current.categoryFilters,
            ...filterRef.current.featureFilters
        ]
        const searchText = filterRef.current.search?.toLowerCase();
        if (searchText && searchText.length > 0)
            filters.push((v: Venue) =>
                v.name.toLowerCase().includes(searchText));
        onFilter(filters);
    }, [onFilter]);

    return <>
        <SidebarGroup>
            <FieldLabel htmlFor="search-venues" className="sr-only">Search venues</FieldLabel>
            <Input id="search-venues"
                   type="text"
                   placeholder="Search venues"
                   onChange={e => updateFilters({ search: e.target.value })} />
        </SidebarGroup>

        <FilterGroup
            heading="Regions"
            defaultOpen={true}
            options={worldFilters}
            singleSelect={true}
            onFilter={e => updateFilters({ locationFilters: e.map(o => o) })} />

        <FilterGroup
            heading="Scenes"
            defaultOpen={false}
            options={categoryFilters}
            onFilter={e => updateFilters({ categoryFilters: e.map(o => o) })} />

        <FilterGroup
            heading="Features"
            defaultOpen={false}
            options={featureFilters}
            onFilter={e => updateFilters({ featureFilters: e.map(o => o) })} />
    </>

});
