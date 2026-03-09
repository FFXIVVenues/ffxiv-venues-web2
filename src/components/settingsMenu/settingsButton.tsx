import { Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import {cn} from "@/lib/utils";

export const SettingsButton = ({ onClick, className }: { onClick: () => void, className?: string }) => (
    <Button variant="ghost" className={cn("w-full justify-start items-center gap-2 py-4", className)} onClick={onClick}>
        <Settings className="size-4"/> <span className="mt-0.5">Settings</span>
    </Button>
);