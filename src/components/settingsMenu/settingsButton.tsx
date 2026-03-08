import { Settings } from "lucide-react";
import { Button } from "@/components/ui/button";

export const SettingsButton = ({ onClick }: { onClick: () => void }) => (
    <Button variant="ghost" className="w-full justify-start gap-2" onClick={onClick}>
        <Settings className="h-4 w-4"/> Settings
    </Button>
);