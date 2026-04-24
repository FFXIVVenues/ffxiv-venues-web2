import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {Sun, Moon, Monitor, LayoutGrid, List, Grid3x3, PanelLeft, PanelRight} from "lucide-react";
import { useSetting } from "@/lib/services/settings/useSetting";
import { settingsService } from "@/lib/services/settings/settingsService";
import {Switch} from "@/components/ui/switch.tsx";
import {Tooltip, TooltipContent, TooltipTrigger} from "@/components/ui/tooltip.tsx";

type SettingsDialogProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
};

export const SettingsDialog = ({ open, onOpenChange }: SettingsDialogProps) => {
    const theme = useSetting('theme');
    const view = useSetting('view');
    const sidebarOpen = useSetting('sidebar');
    const drawerSide = useSetting('drawerSide');
    const showHidden = useSetting('showHidden');

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Settings</DialogTitle>
                </DialogHeader>

                <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Theme</span>
                    <ToggleGroup variant="outline" value={[theme]} onValueChange={value => {
                        const last = value[value.length - 1];
                        if (last) settingsService.setSetting('theme', last);
                    }}>
                        <Tooltip>
                            <TooltipTrigger render={<ToggleGroupItem value="light" aria-label="Light"><Sun className="h-4 w-4"/></ToggleGroupItem>} />
                            <TooltipContent>Light Mode</TooltipContent>
                        </Tooltip>

                        <Tooltip>
                            <TooltipTrigger render={<ToggleGroupItem value="system" aria-label="System"><Monitor className="h-4 w-4"/></ToggleGroupItem>} />
                            <TooltipContent>Use System Theme</TooltipContent>
                        </Tooltip>

                        <Tooltip>
                            <TooltipTrigger render={<ToggleGroupItem value="dark" aria-label="Dark"><Moon className="h-4 w-4"/></ToggleGroupItem>} />
                            <TooltipContent>Dark Mode</TooltipContent>
                        </Tooltip>
                    </ToggleGroup>
                </div>

                <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Venue schedule layout</span>
                    <ToggleGroup variant="outline" value={[view]} onValueChange={value => {
                        const last = value[value.length - 1];
                        if (last) settingsService.setSetting('view', last);
                    }}>
                        <Tooltip>
                            <TooltipTrigger render={<ToggleGroupItem value="card" aria-label="Card"><LayoutGrid className="h-4 w-4"/></ToggleGroupItem>} />
                            <TooltipContent>Card View</TooltipContent>
                        </Tooltip>

                        <Tooltip>
                            <TooltipTrigger render={<ToggleGroupItem value="compact" aria-label="Compact"><Grid3x3 className="h-4 w-4"/></ToggleGroupItem>} />

                            <TooltipContent>Compact View</TooltipContent>
                        </Tooltip>

                        <Tooltip>
                            <TooltipTrigger render={<ToggleGroupItem value="list" aria-label="List View"><List className="h-4 w-4"></List></ToggleGroupItem>} />
                            <TooltipContent>List View</TooltipContent>
                        </Tooltip>
                    </ToggleGroup>
                </div>

                <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Side for venue details</span>
                    <ToggleGroup variant="outline" value={[drawerSide]} onValueChange={value => {
                        const last = value[value.length - 1];
                        if (last) settingsService.setSetting('drawerSide', last);
                    }}>
                        <Tooltip>
                            <TooltipTrigger render={<ToggleGroupItem value="left" aria-label="Left"><PanelLeft className="h-4 w-4"/></ToggleGroupItem>} />
                            <TooltipContent>Left</TooltipContent>
                        </Tooltip>
                        <Tooltip>
                            <TooltipTrigger render={<ToggleGroupItem value="right" aria-label="Right"><PanelRight className="h-4 w-4"/></ToggleGroupItem>} />
                            <TooltipContent>Right</TooltipContent>
                        </Tooltip>
                    </ToggleGroup>
                </div>

                <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Show navigation bar by default</span>
                    <Switch
                        checked={sidebarOpen}
                        onCheckedChange={value => settingsService.setSetting('sidebar', value)}
                        aria-label="Show navigation bar"
                    />
                </div>

                <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Show hidden venues</span>
                    <Switch
                        checked={showHidden}
                        onCheckedChange={value => settingsService.setSetting('showHidden', value)}
                        aria-label="Show hidden venues"
                    />
                </div>
            </DialogContent>
        </Dialog>
    );
};