import {Children, type FC, isValidElement, type ReactElement, type ReactNode, useState} from "react";
import logoLight from "@/assets/logo-light-300.webp";
import logoDark from "@/assets/logo-dark-300.webp";
import {
    Sidebar, SidebarContent, SidebarFooter,
    SidebarHeader, SidebarProvider, SidebarRail, SidebarTrigger
} from "@/components/ui/sidebar.tsx";
import { TooltipProvider } from "@/components/ui/tooltip";
import {SettingsButton} from "@/components/settingsMenu/settingsButton.tsx";
import {SettingsDialog} from "@/components/settingsMenu/settingsDialog.tsx";
import {useSetting} from "@/lib/services/settings/useSetting";
import {Toaster} from "@/components/ui/sonner.tsx";

type DefaultLayoutProps = {
    children: ReactNode;
    className?: string;
};

type CompoundComponent<P = {}> = FC<P> & {
    Panel: FC<{ children: ReactNode }>;
    Page: FC<{ children: ReactNode }>;
};

export const DefaultPageLayout: CompoundComponent<DefaultLayoutProps> = ({children, className}) => {
    const compounds = Children.toArray(children);
    const sidebarContent = compounds.find(
        (c): c is ReactElement => isValidElement(c) && c.type === DefaultPageLayout.Panel
    );
    const pageContent = compounds.find(
        (c): c is ReactElement => isValidElement(c) && c.type === DefaultPageLayout.Page
    );
    const [settingsOpen, setSettingsOpen] = useState(false);
    const sidebarDefault = useSetting('sidebar');

    return <>
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
                    <SettingsButton className="cursor-pointer" onClick={() => setSettingsOpen(true)} />
                    <SettingsDialog open={settingsOpen} onOpenChange={setSettingsOpen} />
                </SidebarFooter>
              <SidebarRail />
            </Sidebar>

            <main className="flex-1 px-2 py-4 overflow-x-hidden">
                <SidebarTrigger/>
                {pageContent}
            </main>

            </SidebarProvider>
          </TooltipProvider>
    </>
}

DefaultPageLayout.Panel = ({children}) => <>{children}</>;
DefaultPageLayout.Page = ({children}) => <div className="min-w-0">{children}</div>;