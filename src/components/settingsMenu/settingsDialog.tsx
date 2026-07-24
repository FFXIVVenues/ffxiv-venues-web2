import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/shadcn/dialog.tsx";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/shadcn/toggle-group.tsx";
import {Sun, Moon, Monitor, LayoutGrid, List, Grid3x3, PanelLeft, PanelRight} from "lucide-react";
import { useSetting } from "@/lib/services/settings/useSetting";
import { settingsService } from "@/lib/services/settings/settingsService";
import {Switch} from "@/components/ui/shadcn/switch.tsx";
import {Tooltip, TooltipContent, TooltipTrigger} from "@/components/ui/shadcn/tooltip.tsx";
import { Trans, useLingui } from "@lingui/react/macro";
import { locales, activateLocale } from "@/lib/services/i18n";

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
    const { t, i18n } = useLingui();

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle><Trans>Settings</Trans></DialogTitle>
                </DialogHeader>

                <div className="flex items-center justify-between">
                    <span className="text-sm font-medium"><Trans>Theme</Trans></span>
                    <ToggleGroup variant="outline" value={[theme]} onValueChange={value => {
                        const last = value[value.length - 1];
                        if (last) settingsService.setSetting('theme', last);
                    }}>
                        <Tooltip>
                            <TooltipTrigger render={<ToggleGroupItem value="light" aria-label={t({ message: `Light`, comment: `Theme option` })}><Sun className="h-4 w-4"/></ToggleGroupItem>} />
                            <TooltipContent><Trans>Light Mode</Trans></TooltipContent>
                        </Tooltip>

                        <Tooltip>
                            <TooltipTrigger render={<ToggleGroupItem value="system" aria-label={t({ message: `System`, comment: `Theme option` })}><Monitor className="h-4 w-4"/></ToggleGroupItem>} />
                            <TooltipContent><Trans>Use System Theme</Trans></TooltipContent>
                        </Tooltip>

                        <Tooltip>
                            <TooltipTrigger render={<ToggleGroupItem value="dark" aria-label={t({ message: `Dark`, comment: `Theme option` })}><Moon className="h-4 w-4"/></ToggleGroupItem>} />
                            <TooltipContent><Trans>Dark Mode</Trans></TooltipContent>
                        </Tooltip>
                    </ToggleGroup>
                </div>

                <div className="flex items-center justify-between">
                    <span className="text-sm font-medium"><Trans>Language</Trans></span>
                    <select
                        value={i18n.locale}
                        onChange={e => activateLocale(e.target.value)}
                        aria-label={t({ message: 'Language', comment: 'Interface language selector' })}
                        className="text-sm bg-background border border-input rounded-md px-2 py-1 cursor-pointer">
                        {Object.entries(locales).map(([code, name]) => (
                            <option key={code} value={code}>{name}</option>
                        ))}
                    </select>
                </div>

                <div className="flex items-center justify-between">
                    <span className="text-sm font-medium"><Trans>Venue schedule layout</Trans></span>
                    <ToggleGroup variant="outline" value={[view]} onValueChange={value => {
                        const last = value[value.length - 1];
                        if (last) settingsService.setSetting('view', last);
                    }}>
                        <Tooltip>
                            <TooltipTrigger render={<ToggleGroupItem value="card" aria-label={t({message: `Card`, comment: `Schedule layout option`})}><LayoutGrid className="h-4 w-4"/></ToggleGroupItem>} />
                            <TooltipContent><Trans>Card View</Trans></TooltipContent>
                        </Tooltip>

                        <Tooltip>
                            <TooltipTrigger render={<ToggleGroupItem value="compact" aria-label={t({message: `Compact`, comment: `Schedule layout option`})}><Grid3x3 className="h-4 w-4"/></ToggleGroupItem>} />

                            <TooltipContent><Trans>Compact View</Trans></TooltipContent>
                        </Tooltip>

                        <Tooltip>
                            <TooltipTrigger render={<ToggleGroupItem value="list" aria-label={t`List View`}><List className="h-4 w-4"></List></ToggleGroupItem>} />
                            <TooltipContent><Trans>List View</Trans></TooltipContent>
                        </Tooltip>
                    </ToggleGroup>
                </div>

                <div className="flex items-center justify-between">
                    <span className="text-sm font-medium"><Trans>Side for venue details</Trans></span>
                    <ToggleGroup variant="outline" value={[drawerSide]} onValueChange={value => {
                        const last = value[value.length - 1];
                        if (last) settingsService.setSetting('drawerSide', last);
                    }}>
                        <Tooltip>
                            <TooltipTrigger render={<ToggleGroupItem value="left" aria-label={t`Left`}><PanelLeft className="h-4 w-4"/></ToggleGroupItem>} />
                            <TooltipContent><Trans comment="Drawer panel position">Left</Trans></TooltipContent>
                        </Tooltip>
                        <Tooltip>
                            <TooltipTrigger render={<ToggleGroupItem value="right" aria-label={t`Right`}><PanelRight className="h-4 w-4"/></ToggleGroupItem>} />
                            <TooltipContent><Trans comment="Drawer panel position">Right</Trans></TooltipContent>
                        </Tooltip>
                    </ToggleGroup>
                </div>

                <div className="flex items-center justify-between">
                    <span className="text-sm font-medium"><Trans>Show navigation bar by default</Trans></span>
                    <Switch
                        checked={sidebarOpen}
                        onCheckedChange={value => settingsService.setSetting('sidebar', value)}
                        aria-label={t`Show navigation bar`}
                    />
                </div>

                <div className="flex items-center justify-between">
                    <span className="text-sm font-medium"><Trans>Show hidden venues</Trans></span>
                    <Switch
                        checked={showHidden}
                        onCheckedChange={value => settingsService.setSetting('showHidden', value)}
                        aria-label={t`Show hidden venues`}
                    />
                </div>
            </DialogContent>
        </Dialog>
    );
};