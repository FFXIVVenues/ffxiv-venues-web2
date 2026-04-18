import {memo} from "react";
import {cn} from "@/lib/utils";

export const Pulse = memo(({ color = "bg-white", className }: { color?: string, className?: string }) =>
  <span className={cn("relative inline-flex h-1.5 w-1.5", className)}>
    <span className={cn(`absolute inline-flex h-full w-full animate-ping rounded-full`, color)}/>
    <span className={cn(`relative inline-flex h-1.5 w-1.5 rounded-full`, color)}/>
  </span>)