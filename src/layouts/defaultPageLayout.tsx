import {Children, type FC, isValidElement, type ReactElement, type ReactNode, useState} from "react";
import logoLight from "@/assets/logo-light-300.webp";
import logoDark from "@/assets/logo-dark-300.webp";
import {
    Sidebar, SidebarContent, SidebarFooter,
    SidebarHeader, SidebarProvider, SidebarRail, SidebarTrigger
} from "@/components/ui/sidebar.tsx";
import { TooltipProvider } from "@/components/ui/tooltip";
import {SettingsDialog} from "@/components/settingsMenu/settingsDialog.tsx";
import {useSetting} from "@/lib/services/settings/useSetting";
import {CreateVenueDialog} from "@/components/createVenueModal/createVenueDialog.tsx";
import {DiscordFillIcon} from "@/components/icons/akar-icons-discord-fill.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Plus, Settings} from "lucide-react";
import {Toaster} from "@/components/ui/sonner.tsx";

type DefaultLayoutProps = {
    children: ReactNode;
    title?: string;
    className?: string;
};

type CompoundComponent<P = {}> = FC<P> & {
    Panel: FC<{ children: ReactNode }>;
    Page: FC<{ children: ReactNode }>;
};

export const DefaultPageLayout: CompoundComponent<DefaultLayoutProps> = ({children, title, className}) => {
    const compounds = Children.toArray(children);
    const sidebarContent = compounds.find(
        (c): c is ReactElement => isValidElement(c) && c.type === DefaultPageLayout.Panel
    );
    const pageContent = compounds.find(
        (c): c is ReactElement => isValidElement(c) && c.type === DefaultPageLayout.Page
    );
    const [settingsOpen, setSettingsOpen] = useState(false);
    const [createVenueOpen, setCreateVenueOpen] = useState( false);
    const sidebarDefault = useSetting('sidebar');

    return <>
        <title>{title ? title : 'FFXIV Venues'}</title>
        <Toaster />
        <TooltipProvider>
          <SidebarProvider defaultOpen={sidebarDefault}>
            <Sidebar variant="floating">
              <SidebarHeader>
                  <h1>
                    <img src={logoLight} alt="FFXIV Venues" className="hidden dark:block mx-auto p-2"/>
                    <img src={logoDark} alt="FFXIV Venues" className="block dark:hidden mx-auto p-2"/>
                  </h1>
              </SidebarHeader>
              <SidebarContent className="px-2">
                  {sidebarContent}
              </SidebarContent>
                <SidebarFooter>
                    <Button variant="ghost" className="cursor-pointer w-full justify-start items-center gap-2 py-4" onClick={() => setCreateVenueOpen(true)}>
                        <Plus className="size-4"/> <span className="mt-0.5">Add your venue</span>
                    </Button>
                    <Button variant="ghost" render={<a href="https://discord.gg/gTP65VYcMj" rel="noopener noreferrer" target="_blank"></a>} className="cursor-pointer w-full justify-start items-center gap-2 py-4">
                      <DiscordFillIcon className="size-4" strokeWidth={0} fill="var(--color-primary)"/>
                      <span className="mt-0.5">Join the discord!</span>
                    </Button>
                    <Button variant="ghost" className="cursor-pointer w-full justify-start items-center gap-2 py-4" onClick={() => setSettingsOpen(true)}>
                        <Settings className="size-4"/> <span className="mt-0.5">Settings</span>
                    </Button>
                    <CreateVenueDialog open={createVenueOpen} onOpenChange={setCreateVenueOpen} />
                    <SettingsDialog open={settingsOpen} onOpenChange={setSettingsOpen} />
                </SidebarFooter>
              <SidebarRail />
            </Sidebar>

            <main className="flex-1 px-2 py-4 overflow-x-hidden">
                {pageContent}
            </main>

            </SidebarProvider>
          </TooltipProvider>
    </>
}

DefaultPageLayout.Panel = ({children}) => <>{children}</>;
DefaultPageLayout.Page = ({children}) => <div className="min-w-0">{children}</div>;