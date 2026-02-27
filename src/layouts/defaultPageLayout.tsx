import {Children, type FC, isValidElement, type ReactElement, type ReactHTMLElement, type ReactNode} from "react";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup, SidebarGroupAction, SidebarGroupContent, SidebarGroupLabel,
    SidebarHeader, SidebarMenuButton, SidebarMenuItem,
    SidebarProvider, SidebarTrigger, SidebarMenu, SidebarMenuSubButton,
    SidebarMenuSubItem, SidebarMenuSub
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
                    <SidebarHeader />
                    <SidebarContent>
                        <SidebarGroup>
                            {sidebarContent}
                        </SidebarGroup>
                    </SidebarContent>
                    <SidebarFooter/>
                </Sidebar>

                <main className="px-2 py-4">
                    <SidebarTrigger />
                    {pageContent}
                </main>

            </SidebarProvider>
        </TooltipProvider>
    </>
}

DefaultPageLayout.Panel = ({children}) => <>{children}</>;
DefaultPageLayout.Page = ({children}) => <>{children}</>;