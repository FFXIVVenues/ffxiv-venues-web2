import {memo} from "react";
import type {ElementType} from "react";
import {Collapsible, CollapsibleContent, CollapsibleTrigger} from "@/components/ui/shadcn/collapsible.tsx";
import {SidebarMenuButton, SidebarMenuSub} from "@/components/ui/shadcn/sidebar.tsx";
import {Tooltip, TooltipContent, TooltipTrigger} from "@/components/ui/shadcn/tooltip.tsx";
import {ChevronDown} from "lucide-react";
import {cn} from "@/lib/utils/cn.ts";
import type {FilterOption} from "@/components/filterMenu/filters/filterOption.ts";
import {FilterMenuList} from "@/components/filterMenu/FilterMenuList.tsx";
import {useLingui} from "@lingui/react";

export type FilterSubMenuProps = {
    option: FilterOption;
    ButtonElement: ElementType;
    enabledFilters: FilterOption[];
    onFilterAdd: (filter: FilterOption) => void;
    onFilterRemove: (filter: FilterOption) => void;
}

export const FilterSubMenu = memo(({
    option,
    ButtonElement,
    enabledFilters,
    onFilterAdd,
    onFilterRemove
}: FilterSubMenuProps) => {
    const { _ } = useLingui();
    const label = typeof option.name === "string" ? option.name : _(option.name);
    const hintText = option.hint == null ? undefined : typeof option.hint === "string" ? option.hint : _(option.hint);
    return (
        <Collapsible>
            <CollapsibleTrigger
                className="cursor-pointer justify-between text-inherit py-4"
                nativeButton={ButtonElement === SidebarMenuButton}
                render={(props, state) => {
                    const content = (
                        <ButtonElement
                            {...props}
                            aria-label={label}>
                            {label}
                            <ChevronDown
                                className={cn(state.open ? 'rotate-180' : '', 'transition-transform text-sidebar-foreground/70')} />
                        </ButtonElement>
                    );

                    if (hintText) {
                        return (
                            <Tooltip>
                                <TooltipTrigger render={content} />
                                <TooltipContent side="right" align="center">
                                    {hintText}
                                </TooltipContent>
                            </Tooltip>
                        );
                    }

                    return content;
                }
                }
            />
            <CollapsibleContent>
                <SidebarMenuSub className="w-full px-3.5 gap-0">
                    <FilterMenuList
                        asSubMenu
                        options={option.options!}
                        enabledFilters={enabledFilters}
                        onFilterAdd={onFilterAdd}
                        onFilterRemove={onFilterRemove}
                    />
                </SidebarMenuSub>
            </CollapsibleContent>
        </Collapsible>
    );
});

FilterSubMenu.displayName = "FilterSubMenu";
