import {memo} from "react";
import type {ElementType, ReactNode} from "react";
import {cn} from "@/lib/utils/cn.ts";
import {Tooltip, TooltipContent, TooltipTrigger} from "@/components/ui/tooltip.tsx";

export type FilterMenuItemProps = {
    isActive: boolean;
    name: string;
    icon?: ReactNode;
    hint?: string;
    className?: string;
    onClick: () => void;
    ButtonElement: ElementType;
}

export const FilterMenuItem = memo(({
    isActive,
    name,
    icon,
    hint,
    className,
    onClick,
    ButtonElement
}: FilterMenuItemProps) => {
    const content = (
        <ButtonElement
            isActive={isActive}
            className={cn("cursor-pointer py-4 flex justify-between items-center relative", className)}
            onClick={onClick}
            aria-label={name}
            tabIndex={0}>
            <span className="flex gap-3 items-center [&>svg]:size-3 [&>svg]:mb-[0.1lh]">
                {icon} {name}
            </span>
            {isActive &&
                <span className="inline-block size-1 mr-1 rounded-full bg-accent shadow-[0_0_4px_var(--color-accent)]" />}
        </ButtonElement>
    );

    if (hint) {
        return (
            <Tooltip>
                <TooltipTrigger render={content} />
                <TooltipContent side="right" align="center"  className="bg-muted text-muted-foreground " >
                    {hint}
                </TooltipContent>
            </Tooltip>
        );
    }

    return content;
});

FilterMenuItem.displayName = "FilterMenuItem";
