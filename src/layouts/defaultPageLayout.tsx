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
import logo from "@/assets/logo-300.webp";
import {ChevronDown} from "lucide-react";
import {Collapsible, CollapsibleContent, CollapsibleTrigger} from "@/components/ui/collapsible.tsx";
import {Input} from "@/components/ui/input.tsx";

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
        <SidebarProvider>
            <Sidebar variant="floating">
                <SidebarHeader/>
                <SidebarContent className="px-2">
                    <SidebarGroup>
                        <h1>
                            <img src={logo} alt="FFXIV Venues" className="mx-auto"/>
                        </h1>
                    </SidebarGroup>
                    <SidebarGroup>
                        <Input type="text" placeholder="Search venues"/>
                    </SidebarGroup>
                    <SidebarGroup>
                        <SidebarMenu>
                            <Collapsible defaultOpen className="group">
                                <CollapsibleTrigger className="w-full">
                                    <SidebarGroupLabel className="uppercase font-bold flex justify-between">
                                        Regions
                                        <ChevronDown className="group-data-open:rotate-180 transition-transform" />
                                    </SidebarGroupLabel>
                                </CollapsibleTrigger>
                                <CollapsibleContent>
                                    <SidebarMenuButton isActive={false}> North America</SidebarMenuButton>
                                    <SidebarMenuButton isActive={false}> Europe</SidebarMenuButton>
                                    <SidebarMenuButton isActive={false}> Oceania</SidebarMenuButton>
                                </CollapsibleContent>
                            </Collapsible>
                        </SidebarMenu>
                    </SidebarGroup>

                    <SidebarGroup>
                        <SidebarMenu>
                            <Collapsible defaultOpen className="group">
                                <CollapsibleTrigger className="w-full">
                                    <SidebarGroupLabel className="w-full uppercase font-bold flex justify-between">
                                        Scenes
                                        <ChevronDown className="group-data-open:rotate-180 transition-transform"/>
                                    </SidebarGroupLabel>
                                </CollapsibleTrigger>
                                <CollapsibleContent>
                                    <SidebarMenuButton isActive={false}> Nightclub</SidebarMenuButton>
                                    <SidebarMenuButton isActive={false}> Den</SidebarMenuButton>
                                    <SidebarMenuButton isActive={false}> Cafe</SidebarMenuButton>
                                    <SidebarMenuButton isActive={false}> Tavern</SidebarMenuButton>
                                    <SidebarMenuButton isActive={false}> Inn</SidebarMenuButton>
                                    <SidebarMenuButton isActive={false}> Lounge</SidebarMenuButton>
                                    <SidebarMenuButton isActive={false}> Bath house</SidebarMenuButton>
                                    <SidebarMenuButton isActive={false}> Restaurant</SidebarMenuButton>
                                    <SidebarMenuButton isActive={false}> Fight club</SidebarMenuButton>
                                    <SidebarMenuButton isActive={false}> Shows and Performances</SidebarMenuButton>
                                    <SidebarMenuButton isActive={false}> Casino</SidebarMenuButton>
                                    <SidebarMenuButton isActive={false}> Shop</SidebarMenuButton>
                                    <SidebarMenuButton isActive={false}> Maid cafe / host club</SidebarMenuButton>
                                    <SidebarMenuButton isActive={false}> Other</SidebarMenuButton>
                                </CollapsibleContent>
                            </Collapsible>
                        </SidebarMenu>
                    </SidebarGroup>

                    <SidebarGroup>
                        <SidebarMenu>
                            <Collapsible defaultOpen className="group">
                                <CollapsibleTrigger className="w-full">
                                    <SidebarGroupLabel className="w-full uppercase font-bold flex justify-between">
                                        Features
                                        <ChevronDown className="group-data-open:rotate-180 transition-transform"/>
                                    </SidebarGroupLabel>
                                </CollapsibleTrigger>
                                <CollapsibleContent>
                                    <SidebarMenuButton isActive={false}> SFW on entry</SidebarMenuButton>
                                    <SidebarMenuButton isActive={false}> NSFW on entry</SidebarMenuButton>
                                    <SidebarMenuButton isActive={false}> Gambling</SidebarMenuButton>
                                    <SidebarMenuButton isActive={false}> Artists</SidebarMenuButton>
                                    <SidebarMenuButton isActive={false}> Dancers</SidebarMenuButton>
                                    <SidebarMenuButton isActive={false}> Bards</SidebarMenuButton>
                                    <SidebarMenuButton isActive={false}> Twitch DJ</SidebarMenuButton>
                                    <SidebarMenuButton isActive={false}> Sync DJ</SidebarMenuButton>
                                    <SidebarMenuButton isActive={false}> Tarot</SidebarMenuButton>
                                    <SidebarMenuButton isActive={false}> LGBTQIA+ focused</SidebarMenuButton>
                                    <SidebarMenuButton isActive={false}> Pillow talk</SidebarMenuButton>
                                    <SidebarMenuButton isActive={false}> Photography</SidebarMenuButton>
                                    <SidebarMenuButton isActive={false}> Open stage</SidebarMenuButton>
                                    <SidebarMenuButton isActive={false}> Stylists</SidebarMenuButton>
                                    <SidebarMenuButton isActive={false}> Performances</SidebarMenuButton>
                                    <SidebarMenuButton isActive={false}> VIP available</SidebarMenuButton>
                                    <SidebarMenuButton isActive={false}> Triple triad</SidebarMenuButton>
                                    <SidebarMenuButton isActive={false}> Courtesans</SidebarMenuButton>
                                    <SidebarMenuButton isActive={false}> RP Encouraged</SidebarMenuButton>
                                </CollapsibleContent>
                            </Collapsible>
                        </SidebarMenu>
                    </SidebarGroup>

                </SidebarContent>
                <SidebarFooter/>
            </Sidebar>

            <main className="px-2 py-4">
                <SidebarTrigger/>
            </main>

        </SidebarProvider>
    </>
}

DefaultPageLayout.Panel = ({children}) => <>{children}</>;
DefaultPageLayout.Page = ({children}) => <>{children}</>;