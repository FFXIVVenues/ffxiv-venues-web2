import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Sun, Moon, Monitor } from "lucide-react";
import { useSetting } from "@/lib/services/settings/useSetting";
import { settingsService } from "@/lib/services/settings/settingsService";

type SettingsDialogProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
};

export const SettingsDialog = ({ open, onOpenChange }: SettingsDialogProps) => {
    const theme = useSetting('theme') ?? 'system';

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
            </DialogContent>
        </Dialog>
    );
};