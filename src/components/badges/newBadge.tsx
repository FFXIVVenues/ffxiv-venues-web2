import {memo} from "react";
import {cn} from "@/lib/utils";
import {Badge} from "@/components/ui/shadcn/badge.tsx";
import {Trans} from "@lingui/react/macro";

export const NewBadge = memo(({ className } : { className?: string}) =>
  <Badge variant="secondary" className={cn("font-bold relative -mt-0.5 bg-green-700", className)}>
    <Trans comment="Badge shown on newly-added venues">New</Trans>
  </Badge>)
