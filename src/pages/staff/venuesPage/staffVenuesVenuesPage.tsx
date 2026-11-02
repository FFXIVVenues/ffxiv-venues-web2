import React, {memo, useCallback, useState} from 'react';
import {DefaultPageLayout} from "@/pageLayouts/defaultPageLayout.tsx";
import {SidebarGroup} from "@/components/ui/shadcn/sidebar.tsx";
import {StaffVenuesPageContent} from "@/pages/staff/venuesPage/staffVenuesPageContent.tsx";
import {Search} from "@/components/search/search.tsx";

export const StaffVenuesVenuesPage = memo(() => {
  const [ search, setSearch ] = useState("");
  const onSearchCallback = useCallback((s:string) => setSearch(s), []);
  return <DefaultPageLayout>
    <DefaultPageLayout.Panel>
      <SidebarGroup>
        <Search onSearch={onSearchCallback} />
      </SidebarGroup>
    </DefaultPageLayout.Panel>
    <DefaultPageLayout.Page>
      <StaffVenuesPageContent search={search} />
    </DefaultPageLayout.Page>
  </DefaultPageLayout>
});








