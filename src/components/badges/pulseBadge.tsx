import {memo, type ReactNode} from "react";
import {Badge} from "@/components/ui/badge.tsx";
import {cn} from "@/lib/utils";
import {Pulse} from "@/components/pulse/pulse.tsx";

export const PulseBadge = memo(({children, className}: { children: ReactNode, className?: string }) => {
  return <Badge variant="secondary" className={cn("font-bold relative pr-6 -mt-0.5 bg-accent", className)}>
    {children}
    <Pulse className="absolute right-2 top-1/2 -translate-y-1/2" />
  </Badge>;
})
