import {DefaultPageLayout} from "@/pageLayoutss/defaultPageLayout.tsx";
import {Trans, useLingui} from "@lingui/react/macro";

export const NotFoundPage = () => {
  const { t } = useLingui();

  return <DefaultPageLayout
      title={`${t`Page not found`} - FFXIV Venues`}>
    <DefaultPageLayout.Page>
      <Trans>Sorry, that page could not be found.</Trans>
    </DefaultPageLayout.Page>
  </DefaultPageLayout>
}