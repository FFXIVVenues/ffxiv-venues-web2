import {DefaultPageLayout} from "@/pageLayoutss/defaultPageLayout.tsx";
import {Trans} from "@lingui/react/macro";

export const NotFoundPage = () => {
  return <DefaultPageLayout
    title="Page not found - FFXIV Venues">
    <DefaultPageLayout.Page>
      <Trans>Sorry, that page could not be found.</Trans>
    </DefaultPageLayout.Page>
  </DefaultPageLayout>
}