import {memo} from "react";
import type {FilterOption} from "@/components/filterMenu/filters/filterOption.ts";
import {FilterMenuItem} from "@/components/filterMenu/FilterMenuItem.tsx";
import {FilterSubMenu} from "@/components/filterMenu/FilterSubMenu.tsx";

import {SidebarMenuItem, SidebarMenuButton, SidebarMenuSubItem, SidebarMenuSubButton} from "@/components/ui/shadcn/sidebar.tsx";

export type FilterMenuListProps = {
    options: FilterOption[];
    asSubMenu?: boolean;
    enabledFilters: FilterOption[];
    onFilterAdd: (filter: FilterOption) => void;
    onFilterRemove: (filter: FilterOption) => void;
}

export const FilterMenuList = memo(({
    options,
    asSubMenu = false,
    enabledFilters,
    onFilterAdd,
    onFilterRemove
}: FilterMenuListProps) => {
    const ItemElement = asSubMenu ? SidebarMenuSubItem : SidebarMenuItem;
    const ButtonElement = asSubMenu ? SidebarMenuSubButton : SidebarMenuButton;

    return (
        <>
            {options.map((option, i) => {
                const isActive = !!(option.filter && enabledFilters.includes(option));

                const prevOption = i > 0 ? options[i - 1] : undefined;
                const nextOption = i < options.length - 1 ? options[i + 1] : undefined;

                const prevIsActive = !!(prevOption?.filter && enabledFilters.includes(prevOption));
                const nextIsActive = !!(nextOption?.filter && enabledFilters.includes(nextOption));

                const roundingStyle = isActive ?
                    (prevIsActive ? 'rounded-t-none ' : '') +
                    (nextIsActive ? 'rounded-b-none ' : '')
                    : '';

                return (
                    <ItemElement key={i}>
                        {!option.options ? (
                            <FilterMenuItem
                                isActive={isActive}
                                name={option.name}
                                icon={option.icon}
                                hint={option.hint}
                                className={roundingStyle}
                                ButtonElement={ButtonElement}
                                onClick={() => isActive ? onFilterRemove(option) : onFilterAdd(option)}
                            />
                        ) : (
                            <FilterSubMenu
                                option={option}
                                ButtonElement={ButtonElement}
                                enabledFilters={enabledFilters}
                                onFilterAdd={onFilterAdd}
                                onFilterRemove={onFilterRemove}
                            />
                        )}
                    </ItemElement>
                );
            })}
        </>
    );
});

FilterMenuList.displayName = "FilterMenuList";
