import React, {
  Children,
  type FC,
  isValidElement,
  type ReactElement,
  type ReactNode,
  useCallback,
  useState
} from "react";
import logoLight from "@/assets/logo-light-300.webp";
import logoDark from "@/assets/logo-dark-300.webp";
import {
  Sidebar, SidebarContent, SidebarFooter,
  SidebarHeader, SidebarProvider, SidebarRail, SidebarTrigger
} from "@/components/ui/shadcn/sidebar.tsx";
import {TooltipProvider} from "@/components/ui/shadcn/tooltip.tsx";
import {SettingsDialog} from "@/components/settingsMenu/settingsDialog.tsx";
import {useSetting} from "@/lib/services/settings/useSetting";
import {CreateVenueDialog} from "@/components/createVenueModal/createVenueDialog.tsx";
import {DiscordFillIcon} from "@/components/icons/discord-fill-icon.tsx";
import {Button} from "@/components/ui/shadcn/button.tsx";
import {ChevronDown, Plus, Settings, SquarePen} from "lucide-react";
import {Toaster} from "@/components/ui/shadcn/sonner.tsx";
import {Trans} from "@lingui/react/macro";
import {NoUser, useUser} from "@/lib/services/user/useUser.ts";
import {useNavigate} from "react-router";
import {Collapsible, CollapsibleContent, CollapsibleTrigger} from "@/components/ui/shadcn/collapsible.tsx";
import {usePersistedState} from "@/lib/utils/hooks/usePersistedState.ts";

type DefaultLayoutProps = {
  children: ReactNode;
  title?: string;
  className?: string;
};

type CompoundComponent<P = {}> = FC<P> & {
  Panel: FC<{ children?: ReactNode }>;
  Page: FC<{ children?: ReactNode }>;
};

export const DefaultPageLayout: CompoundComponent<DefaultLayoutProps> = ({children, title}) => {
  const navigate = useNavigate();
  const compounds = Children.toArray(children);
  const sidebarContent = compounds.find(
    (c): c is ReactElement => isValidElement(c) && c.type === DefaultPageLayout.Panel
  );
  const pageContent = compounds.find(
    (c): c is ReactElement => isValidElement(c) && c.type === DefaultPageLayout.Page
  );
  const onCreateClickCallback = useCallback(() => navigate(`/venue/create`), [navigate]);
  const onManageClickCallback = useCallback(() => navigate(`/venue/manage`), [navigate]);

  const [userPanelExpanded, setUserPanelExpanded] = usePersistedState("user-panel-extended", false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [createVenueOpen, setCreateVenueOpen] = useState(false);
  const sidebarDefault = useSetting('sidebar');
  const user = useUser();

  return <>
    <title>{title ? title : 'FFXIV Venues'}</title>
    <Toaster/>
    <TooltipProvider delay={600}>
      <SidebarProvider defaultOpen={sidebarDefault}>
        <Sidebar variant="floating">
          <SidebarHeader className="p-0">
            <h1 className="px-2 pt-2">
              <a href="/">
                <img src={logoLight} alt="FFXIV Venues" className="hidden dark:block mx-auto p-2"/>
                <img src={logoDark} alt="FFXIV Venues" className="block dark:hidden mx-auto p-2"/>
              </a>
            </h1>
            {user && user != NoUser &&
              <Collapsible open={userPanelExpanded} onOpenChange={setUserPanelExpanded} className="flex flex-col group border-y py-3 px-2 mb-3">
                <CollapsibleTrigger className="w-full cursor-pointer group-data-open:mb-4">
                  <div className="flex items-center px-2 text-left w-full">
                    <img className="rounded-full size-10 mr-4" src={user.avatarUrl} alt="" />
                    <div className="flex-1 flex flex-col">
                      <div className="">{user.nickname}</div>
                      <small className="text-muted-foreground -mt-0.5">{user.username}</small>
                    </div>
                    <ChevronDown className="size-5 group-data-open:rotate-180" />
                  </div>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <Button variant="ghost" className="cursor-pointer w-full justify-start items-center gap-2 py-4"
                          onClick={onCreateClickCallback}>
                    <Plus className="size-4"/>
                    <span className="mt-0.5"><Trans>Create venue</Trans></span>
                  </Button>

                  <Button variant="ghost" className="cursor-pointer w-full justify-start items-center gap-2 py-4"
                          onClick={onManageClickCallback}>
                    <SquarePen className="size-4"/>
                    <span className="mt-0.5"><Trans>Manage venues</Trans></span>
                  </Button>
                </CollapsibleContent>
              </Collapsible>
            }
          </SidebarHeader>
          <SidebarContent className="px-2">
            {sidebarContent}
          </SidebarContent>
          <SidebarFooter>
            {(!user || user != NoUser) &&
              <Button variant="ghost" className="cursor-pointer w-full justify-start items-center gap-2 py-4"
                      onClick={() => setCreateVenueOpen(true)}>
                <Plus className="size-4"/>
                <span className="mt-0.5"><Trans>Add your venue</Trans></span>
              </Button>
            }
            <Button nativeButton={false} variant="ghost"
                    render={<a href="https://discord.gg/gTP65VYcMj" rel="noopener noreferrer" target="_blank"></a>}
                    className="cursor-pointer w-full justify-start items-center gap-2 py-4">
              <DiscordFillIcon className="size-4" strokeWidth={0} fill="var(--color-primary)"/>
              <span className="mt-0.5"><Trans>Join the discord!</Trans></span>
            </Button>
            <Button variant="ghost" className="cursor-pointer w-full justify-start items-center gap-2 py-4"
                    onClick={() => setSettingsOpen(true)}>
              <Settings className="size-4"/>
              <span className="mt-0.5"><Trans>Settings</Trans></span>
            </Button>
            <CreateVenueDialog open={createVenueOpen} onOpenChange={setCreateVenueOpen}/>
            <SettingsDialog open={settingsOpen} onOpenChange={setSettingsOpen}/>
          </SidebarFooter>
          <SidebarRail/>
        </Sidebar>

        <main className="flex-1 px-2 py-4 overflow-x-hidden">
          <SidebarTrigger size="icon-lg"
                          className="fixed -ml-[1rem] top-25 z-10 bg-sidebar rounded-tl-none rounded-bl-none border border-l-0 border-sidebar-border w-10 pl-1"/>
          {pageContent}
          <footer className="text-center text-sm text-muted-foreground mt-16 mb-8 mx-12">
            <hr className="my-8"/>
            <p className="mb-4">
              <Trans>
                FINAL FANTASY is a registered trademark of Square Enix Holdings Co., Ltd.
                <br/>
                Any FFXIV material used on this site is © SQUARE ENIX CO., LTD. All Rights Reserved.
              </Trans>
            </p>
            <p>
              FFXIV Venues | <a className="underline" href="/terms"><Trans>Terms of Service</Trans></a> | <a
              className="underline" href="/privacy"><Trans>Privacy Policy</Trans></a>
            </p>
          </footer>
        </main>

      </SidebarProvider>
    </TooltipProvider>
  </>
}

DefaultPageLayout.Panel = ({children}) => <>{children}</>;
DefaultPageLayout.Page = ({children}) => <div className="min-w-0">{children}</div>;