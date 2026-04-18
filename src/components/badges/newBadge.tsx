import {memo} from "react";
import {cn} from "@/lib/utils";
import {Badge} from "@/components/ui/badge.tsx";

export const NewBadge = memo(({ className } : { className?: string}) =>
  <Badge variant="secondary" className={cn("font-bold relative -mt-0.5 bg-green-700", className)}>
    New
  </Badge>)
