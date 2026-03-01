import {Children, type FC, isValidElement, type ReactElement, type ReactNode} from "react";
import logo from "@/assets/logo-300.webp";
import {
    Sidebar, SidebarContent, SidebarFooter,
    SidebarHeader, SidebarProvider, SidebarRail, SidebarTrigger
} from "@/components/ui/sidebar.tsx";
import { TooltipProvider } from "@/components/ui/tooltip";

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
              <SidebarFooter/>
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
DefaultPageLayout.Page = ({children}) => <div className="max-w-full min-w-0">{children}</div>;