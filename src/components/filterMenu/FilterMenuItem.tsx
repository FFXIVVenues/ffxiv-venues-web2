import {memo} from "react";
import type {ElementType, ReactNode} from "react";
import {cn} from "@/lib/utils/cn.ts";
import {Tooltip, TooltipContent, TooltipTrigger} from "@/components/ui/shadcn/tooltip.tsx";
import type {MessageDescriptor} from "@lingui/core";
import {useLingui} from "@lingui/react";

export type FilterMenuItemProps = {
    isActive: boolean;
    name: string | MessageDescriptor;
    icon?: ReactNode;
    hint?: string | MessageDescriptor;
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
    const { _ } = useLingui();
    const label = typeof name === "string" ? name : _(name);
    const hintText = hint == null ? undefined : typeof hint === "string" ? hint : _(hint);
    const content = (
        <ButtonElement
            isActive={isActive}
            className={cn("cursor-pointer py-4 flex justify-between items-center relative", className)}
            onClick={onClick}
            aria-label={label}
            tabIndex={0}>
            <span className="flex gap-3 items-center [&>svg]:size-3 [&>svg]:mb-[0.1lh]">
                {icon} {label}
            </span>
            {isActive &&
                <span className="inline-block size-1 mr-1 rounded-full bg-accent shadow-[0_0_4px_var(--color-accent)]" />}
        </ButtonElement>
    );

    if (hintText) {
        return (
            <Tooltip>
                <TooltipTrigger render={content} />
                <TooltipContent side="right" align="center"  className="bg-muted text-muted-foreground " >
                    {hintText}
                </TooltipContent>
            </Tooltip>
        );
    }

    return content;
});

FilterMenuItem.displayName = "FilterMenuItem";
