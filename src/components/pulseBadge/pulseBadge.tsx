import {memo, type ReactNode} from "react";
import {Badge} from "@/components/ui/badge.tsx";
import {cn} from "@/lib/utils";

export const PulseBadge = memo(({children, className}: { children: ReactNode, className?: string }) => {
  return <Badge variant="secondary" className={cn("font-bold relative pr-6 -mt-0.5 bg-accent", className)}>
    {children}
    <span className="absolute right-2 top-1/2 -translate-y-1/2 flex h-1.5 w-1.5">
            <span className={`absolute inline-flex h-full w-full animate-ping rounded-full bg-foreground`}/>
            <span className={`relative inline-flex h-1.5 w-1.5 rounded-full bg-foreground`}/>
        </span>
  </Badge>;
})