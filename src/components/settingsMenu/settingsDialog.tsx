import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Sun, Moon, Monitor, LayoutGrid, List, LayoutList } from "lucide-react";
import { useSetting } from "@/lib/services/settings/useSetting";
import { settingsService } from "@/lib/services/settings/settingsService";

type SettingsDialogProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
};

export const SettingsDialog = ({ open, onOpenChange }: SettingsDialogProps) => {
    const theme = useSetting('theme') ?? 'system';
    const view = useSetting('view') ?? 'card';

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Settings</DialogTitle>
                </DialogHeader>
                <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Theme</span>
                    <ToggleGroup value={[theme]} onValueChange={value => {
                        const last = value[value.length - 1];
                        if (last) settingsService.setSetting('theme', last);
                    }}>
                        <ToggleGroupItem value="light" aria-label="Light"><Sun className="h-4 w-4"/></ToggleGroupItem>
                        <ToggleGroupItem value="system" aria-label="System"><Monitor className="h-4 w-4"/></ToggleGroupItem>
                        <ToggleGroupItem value="dark" aria-label="Dark"><Moon className="h-4 w-4"/></ToggleGroupItem>
                    </ToggleGroup>
                </div>

                <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">View</span>
                    <ToggleGroup value={[view]} onValueChange={value => {
                        const last = value[value.length - 1];
                        if (last) settingsService.setSetting('view', last);
                    }}>
                        <ToggleGroupItem value="card" aria-label="Card"><LayoutGrid className="h-4 w-4"/></ToggleGroupItem>
                        <ToggleGroupItem value="compact" aria-label="Compact"><LayoutList className="h-4 w-4"/></ToggleGroupItem>
                        <ToggleGroupItem value="list" aria-label="List View"><List className="h-4 w-4"></List></ToggleGroupItem>
                    </ToggleGroup>
                </div>
            </DialogContent>
        </Dialog>
    );
};