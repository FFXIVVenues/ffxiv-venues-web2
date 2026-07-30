import {memo} from "react";
import { PulseBadge } from "./pulseBadge.tsx";
import {cn} from "@/lib/utils";
import {Trans} from "@lingui/react/macro";

export const OpenBadge = memo(() =>
  <PulseBadge className={cn("shadow bg-accent")}><Trans comment="Badge shown when a venue is currently open">Open</Trans></PulseBadge>)