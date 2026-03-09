import {memo, useState, type ElementType} from "react";
import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem, SidebarMenuSub, SidebarMenuSubButton, SidebarMenuSubItem
} from "@/components/ui/sidebar.tsx";
import {Collapsible, CollapsibleContent, CollapsibleTrigger} from "@/components/ui/collapsible.tsx";
import {ChevronDown} from "lucide-react";
import type {FilterOption} from "@/components/filterMenu/filters/categoryFilters.ts";
import type {Filter} from "@/components/filterMenu/filterMenu.tsx";
import {cn} from "@/lib/utils/cn.ts";

export type FilterGroupProps = {
    heading: string;
    options: FilterOption[];
    singleSelect?: boolean;
    defaultOpen?: boolean;
    onFilter: (e: Filter[]) => void;
}

export const FilterGroup = memo(({heading, options, onFilter, singleSelect = false, defaultOpen = true}: FilterGroupProps) => {
    const [enabledFilters, setEnabledFilters] = useState<Filter[]>([]);

    const addFilter = (filter: Filter) => {
        let newFilters = [ filter ];
        if (!singleSelect)
            newFilters = [ ...enabledFilters, filter];
        setEnabledFilters(newFilters);
        onFilter(newFilters);
    };

    const removeFilter = (filter: Filter) => {
        const newFilters = enabledFilters.filter(f => f !== filter);
        setEnabledFilters(newFilters);
        onFilter(newFilters);
    }

    const renderMenuItems = (
        ItemElement: ElementType,
        ButtonElement: ElementType,
        options: FilterOption[]
    ) =>
        options.map((option, i) => {
            const isActive = option.filter && enabledFilters.includes(option.filter);

            const prevOption = i > 0 ? options[i - 1] : undefined;
            const nextOption = i < options.length - 1 ? options[i + 1] : undefined;

            const prevIsActive = prevOption?.filter && enabledFilters.includes(prevOption.filter);
            const nextIsActive = nextOption?.filter && enabledFilters.includes(nextOption.filter);

            const roundingStyle= isActive ?
                (prevIsActive ? 'rounded-t-none ' : '') +
                (nextIsActive ? 'rounded-b-none ' : '')
                : ''

            return (
                <ItemElement key={i}>
                    {!option.options
                        ?
                        <ButtonElement
                            isActive={isActive}
                            className={cn(roundingStyle, "cursor-pointer py-4 flex justify-between items-center relative")}
                            onClick={() => isActive ? removeFilter(option.filter!) : addFilter(option.filter!)}>
                            {option.name}
                            {isActive &&
                              <span className="inline-block size-1 mr-1 rounded-full bg-accent shadow-[0_0_4px_var(--color-accent)]" />}
                        </ButtonElement>
                        :
                        <Collapsible>
                            <CollapsibleTrigger className="cursor-pointer justify-between text-inherit py-4"
                                                nativeButton={ButtonElement === SidebarMenuButton}
                                                    render={(props, state) =>
                                    <ButtonElement
                                        {...props}>
                                        {option.name}
                                        {option.options &&
                                          <ChevronDown className={cn(state.open ? 'rotate-180' : '', 'transition-transform text-sidebar-foreground/70')} />}
                                    </ButtonElement>
                                }/>
                                <CollapsibleContent>
                                    <SidebarMenuSub className="w-full px-3.5 gap-0">
                                        {renderMenuItems(SidebarMenuSubItem, SidebarMenuSubButton, option.options)}
                                    </SidebarMenuSub>
                                </CollapsibleContent>
                            </Collapsible>
                    }
                </ItemElement>
            )
        });

    return <SidebarGroup>
        <SidebarMenu>
            <Collapsible defaultOpen={defaultOpen} className="group">
                <CollapsibleTrigger
                    className="w-full cursor-pointer">
                        <SidebarGroupLabel className="w-full uppercase font-bold flex justify-between">
                            {heading}
                            <ChevronDown className="group-data-open:rotate-180 transition-transform"/>
                        </SidebarGroupLabel>
                </CollapsibleTrigger>
                <CollapsibleContent>
                    {renderMenuItems(SidebarMenuItem, SidebarMenuButton, options)}
                </CollapsibleContent>
            </Collapsible>
        </SidebarMenu>
    </SidebarGroup>
});