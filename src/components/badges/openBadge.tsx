import {memo} from "react";
import { PulseBadge } from "./pulseBadge.tsx";
import {cn} from "@/lib/utils";

export const OpenBadge = memo(() =>
  <PulseBadge className={cn("shadow bg-accent")}>Open</PulseBadge>)