import {memo, useState, useCallback} from "react";
import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem
} from "@/components/ui/sidebar.tsx";
import {Collapsible, CollapsibleContent, CollapsibleTrigger} from "@/components/ui/collapsible.tsx";
import {ChevronDown} from "lucide-react";
import type {Filter} from "@/components/filterMenu/filterMenu.tsx";
import type {FilterOption} from "@/components/filterMenu/filters/filterOption.ts";
import {FilterMenuList} from "@/components/filterMenu/FilterMenuList.tsx";

export type FilterGroupProps = {
    heading: string;
    options: FilterOption[];
    defaultOpen?: boolean;
    onFilter: (e: Filter[]) => void;
}

export const FilterGroup = memo(({heading, options, onFilter, defaultOpen = true}: FilterGroupProps) => {
    const [enabledFilters, setEnabledFilters] = useState<FilterOption[]>([]);

    const addFilter = useCallback((filter: FilterOption) => {
        setEnabledFilters(prev => {
            const newFilters = prev
              .filter(o => !o.mek || o.mek != filter.mek );
            newFilters.push(filter);
            onFilter(newFilters.map(o => o.filter!));
            return [...newFilters];
        });
    }, [onFilter]);

    const removeFilter = useCallback((filter: FilterOption) => {
        setEnabledFilters(prev => {
            const newFilters = prev.filter(f => f !== filter);
            onFilter(newFilters.map(o => o.filter!));
            return [...newFilters];
        });
    }, [onFilter]);

    return <SidebarGroup>
        <Collapsible defaultOpen={defaultOpen} className="group">
            <CollapsibleTrigger className="w-full cursor-pointer">
                <SidebarGroupLabel className="w-full uppercase font-bold flex justify-between">
                    {heading}
                    <ChevronDown className="group-data-open:rotate-180 transition-transform"/>
                </SidebarGroupLabel>
            </CollapsibleTrigger>
            <CollapsibleContent>
                <SidebarMenu>
                    <FilterMenuList
                        options={options}
                        enabledFilters={enabledFilters}
                        onFilterAdd={addFilter}
                        onFilterRemove={removeFilter}
                    />
                </SidebarMenu>
            </CollapsibleContent>
        </Collapsible>
    </SidebarGroup>
});