import {memo} from "react";
import {useLingui} from "@lingui/react";
import {DefaultPageLayout} from "@/pageLayoutss/defaultPageLayout.tsx";
import {SidebarMenuButton} from "@/components/ui/shadcn/sidebar.tsx";
import {LegalDocument, extractSections} from "@/components/legal/legalDocument.tsx";
import {Trans} from "@lingui/react/macro";
import {EffectiveDate} from "@/components/legal/effectiveDate.tsx";

const docs = import.meta.glob("../../content/legal/terms/*.md", {
  query: "?raw", import: "default", eager: true,
}) as Record<string, string>;

const pick = (locale: string) => {
  const at = (loc: string) => Object.entries(docs).find(([p]) => p.endsWith(`/${loc}.md`))?.[1];
  return at(locale) ?? at("en") ?? "";
};

const S = { m: "mx-2 w-auto -mt-1/2" };

export const TermsOfServicePage = memo(() => {
  const { i18n } = useLingui();
  const md = pick(i18n.locale);
  const sections = extractSections(md);

  return <DefaultPageLayout>
    <DefaultPageLayout.Panel>
      {sections.map(s => (
        <SidebarMenuButton key={s.id} className={S.m} render={<a href={`#${s.id}`}>{s.title}</a>} />
      ))}
    </DefaultPageLayout.Panel>
    <DefaultPageLayout.Page>
      <div className="max-w-3xl mx-auto px-6 py-12 text-sm leading-relaxed">
        <h1 className="text-3xl font-bold mb-1"><Trans>Terms of Service</Trans></h1>
        <p className="text-xs italic text-gray-500 mb-2"><Trans>Applies to FFXIV Venues Site / API / Veni Ki / Ruby Ki</Trans></p>
        <hr className="mb-8" />

        <LegalDocument markdown={md} />

        <p className="text-right text-xs italic text-gray-500 mt-16"><EffectiveDate date={new Date(2026, 3, 23)} /></p>
      </div>
    </DefaultPageLayout.Page>
  </DefaultPageLayout>;
});
