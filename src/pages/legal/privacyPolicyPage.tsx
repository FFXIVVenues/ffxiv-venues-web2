import {memo} from "react";
import {useLingui} from "@lingui/react";
import {DefaultPageLayout} from "@/pageLayoutss/defaultPageLayout.tsx";
import {SidebarMenuButton} from "@/components/ui/shadcn/sidebar.tsx";
import {MdDocument, extractSections} from "@/components/markdown/MdDocument.tsx";
import {FormattedDate} from "@/components/dateString/formattedDate.tsx";
import {Trans} from "@lingui/react/macro";
import {_md} from "@/lib/utils/md.ts";

const S = { m: "mx-2 w-auto -mt-1/2" };

export const PrivacyPolicyPage = memo(() => {
  const { i18n } = useLingui();
  const md = _md("legal/privacy", i18n.locale);
  const sections = extractSections(md);
  const effective = <FormattedDate date={new Date(2026, 3, 23)} format="effective" />;

  return <DefaultPageLayout>
    <DefaultPageLayout.Panel>
      {sections.map(s => (
        <SidebarMenuButton key={s.id} className={S.m} render={<a href={`#${s.id}`}>{s.title}</a>} />
      ))}
    </DefaultPageLayout.Panel>
    <DefaultPageLayout.Page>
      <div className="max-w-3xl mx-auto px-6 py-12 text-sm leading-relaxed">
        <h1 className="text-3xl font-bold mb-1"><Trans>Privacy Policy</Trans></h1>
        <p className="text-xs italic text-gray-500 mb-2"><Trans>Applies to FFXIV Venues Site / API / Veni Ki / Ruby Ki</Trans></p>
        <hr className="mb-8" />

        <MdDocument markdown={md} DecimalNumberedIndents />

        <p className="text-right text-xs italic text-gray-500 mt-16">
          <Trans>Effective {effective}</Trans>
        </p>
      </div>
    </DefaultPageLayout.Page>
  </DefaultPageLayout>;
});
