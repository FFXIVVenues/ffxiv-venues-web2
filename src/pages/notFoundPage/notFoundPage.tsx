import {DefaultPageLayout} from "@/layouts/defaultPageLayout.tsx";

export const NotFoundPage = () => {
  return <DefaultPageLayout
    title="Page not found - FFXIV Venues">
    <DefaultPageLayout.Page>
      Sorry, that page could not be found.
    </DefaultPageLayout.Page>
  </DefaultPageLayout>
}