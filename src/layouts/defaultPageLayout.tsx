import {Children, type FC, isValidElement, type ReactElement, type ReactNode, useState} from "react";
import logo from "@/assets/logo-300.webp";
import {
    Sidebar, SidebarContent, SidebarFooter,
    SidebarHeader, SidebarProvider, SidebarRail, SidebarTrigger
} from "@/components/ui/sidebar.tsx";
import { TooltipProvider } from "@/components/ui/tooltip";
import {SettingsButton} from "@/components/settingsMenu/settingsButton.tsx";
import {SettingsDialog} from "@/components/settingsMenu/settingsDialog.tsx";

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

    return <>
        <TooltipProvider>
          <SidebarProvider>
            <Sidebar variant="floating">
              <SidebarHeader>
                  <h1><img src={logo} alt="FFXIV Venues" className="mx-auto p-2"/></h1>
              </SidebarHeader>
              <SidebarContent className="px-2">
                  {sidebarContent}
              </SidebarContent>
                <SidebarFooter>
                    <SettingsButton onClick={() => setSettingsOpen(true)} />
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