import React, {memo, type ReactNode} from "react";
import {DefaultPageLayout} from "@/pageLayoutss/defaultPageLayout.tsx";
import {SidebarMenuButton} from "@/components/ui/shadcn/sidebar.tsx";
import {A} from "@/components/ui/a.tsx";

const S = {
  m: "mx-2 w-auto -mt-1/2",
  h2: "text-xl font-semibold mt-10 mb-2",
  h3: "text-base font-semibold mt-6 mb-2",
  p: "flex gap-4 mb-2 text-sm leading-relaxed",
  num: "font-semibold shrink-0",
  sub: "flex gap-4 mb-1.5 text-sm leading-relaxed pl-9",
};

export const TermsOfServicePage = memo(() => {
  return <DefaultPageLayout>
    <DefaultPageLayout.Panel>
      <SidebarMenuButton className={S.m} render={<a href="#whoweare">1. Who we are</a>}/>
      <SidebarMenuButton className={S.m} render={<a href="#about">2. About these terms</a>}/>
      <SidebarMenuButton className={S.m} render={<a href="#listings">3. Your submitted content</a>}/>
      <SidebarMenuButton className={S.m} render={<a href="#acceptable">4. Acceptable use</a>}/>
      <SidebarMenuButton className={S.m} render={<a href="#moderation">5. Moderation and removal</a>}/>
      <SidebarMenuButton className={S.m} render={<a href="#api">6. The public API</a>}/>
      <SidebarMenuButton className={S.m} render={<a href="#attribution">7. Attribution</a>}/>
      <SidebarMenuButton className={S.m} render={<a href="#ip">8. Intellectual property</a>}/>
      <SidebarMenuButton className={S.m} render={<a href="#availability">9. Availability of service</a>}/>
      <SidebarMenuButton className={S.m} render={<a href="#disclaimers">10. Disclaimers</a>}/>
      <SidebarMenuButton className={S.m} render={<a href="#liability">11. Limitation of liability</a>}/>
      <SidebarMenuButton className={S.m} render={<a href="#termination">12. Suspension and termination</a>}/>
      <SidebarMenuButton className={S.m} render={<a href="#changes">13. Changes to these terms</a>}/>
      <SidebarMenuButton className={S.m} render={<a href="#contact">14. Contact us</a>}/>
    </DefaultPageLayout.Panel>
    <DefaultPageLayout.Page>
      <div className="max-w-3xl mx-auto px-6 py-12 text-sm leading-relaxed">

        <h1 className="text-3xl font-bold mb-1">Terms of Service</h1>
        <p className="text-xs italic text-gray-500 mb-2">Applies to FFXIV Venues Site / API / Veni Ki / Ruby Ki</p>
        <hr className="mb-8" />

        <h2 className={S.h2} id="whoweare">1. Who we are</h2>
        <P n="1.1">FFXIV Venues is a community-run platform that allows Final Fantasy XIV players to discover and list in-game venues. It is operated as a non-commercial community project, provided free of charge for community use, and is accessible at <A href="/">ffxivvenues.com</A>.</P>
        <P n="1.2">These terms are an agreement between you and the operators of FFXIV Venues (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;).</P>

        <h2 className={S.h2} id="about">2. About these terms</h2>
        <P n="2.1">These terms of service govern your access to and use of FFXIV Venues and all of it's services, including but not limited to:</P>
        <Sub n="2.1.1">Our website.</Sub>
        <Sub n="2.1.2">Our public API.</Sub>
        <Sub n="2.1.3">Our Discord bots (Veni Ki and Ruby Ki).</Sub>
        <Sub n="2.1.4">Our statistics dashboard.</Sub>
        <P n="2.2">By accessing or using the service, you agree to these terms. If you do not agree, please do not use the service.</P>
        <P n="2.3">These terms should be read alongside our <A href="/privacy">Privacy Policy</A>, which explains how we handle personal data and forms part of these terms.</P>

        <h2 className={S.h2} id="listings">3. Your listings and submitted content</h2>
        <P n="3.1">You are responsible for the content you submit, including venue names, descriptions, schedules, images, links, and any other details.</P>
        <P n="3.2">You must have the right to submit the content you provide, and it must be accurate to the best of your knowledge.</P>
        <P n="3.3">By submitting a listing, you grant us a non-exclusive, royalty-free licence to store, display, and distribute that content through the service (including the website, API, and statistics dashboard) for the purpose of operating FFXIV Venues.</P>
        <P n="3.4">You retain ownership of the content you submit. You can edit or request removal of your listing at any time through Veni Ki or by contacting us.</P>
        <P n="3.5">We do not claim ownership of your venue or its concept, and we do not guarantee that a listing will remain available or be free from error.</P>

        <h2 className={S.h2} id="acceptable">4. Acceptable use</h2>
        <P n="4.1">When submitting or managing venue listings, you must not:</P>
        <Sub n="4.1.1">Submit content that is unlawful, hateful, harassing, defamatory, or that infringes the rights of others.</Sub>
        <Sub n="4.1.2">Submit sexual content involving minors, or any content that sexualises children, including through Lalafell or &ldquo;kitten&rdquo; characters, under any circumstances.</Sub>
        <Sub n="4.1.3">Submit or list venues that provide, host, or advertise erotic services, content, or spaces involving Lalafell or &ldquo;kitten&rdquo; characters, including but not limited to within their Discord, on their website, or at the in-game location.</Sub>
        <Sub n="4.1.4">Submit listings for venues that are not actively open or operating, submit spam, or submit deliberately false or misleading content or flags - for example, by listing opening hours during which your venue is knowingly unstaffed.</Sub>
        <Sub n="4.1.5">Use the service in a way you know is not its intended purpose in order to gain an unfair advantage for your venue or to otherwise affect the accuracy of the index.</Sub>
        <P n="4.2">When using the service, you must not:</P>
        <Sub n="4.2.1">Attempt to gain unauthorised access to the service, its infrastructure, or other users&rsquo; data.</Sub>
        <Sub n="4.2.2">Interfere with, disrupt, or place an unreasonable load on the service or its infrastructure.</Sub>
        <P n="4.3">You are responsible for all activity carried out under your Discord account in connection with the service.</P>

        <h2 className={S.h2} id="moderation">5. Moderation and removal</h2>
        <P n="5.1">To help keep listings safe and accurate, users can flag venues for review. A flag consists of a reason and an optional description and is anonymous.</P>
        <P n="5.2">Moderation is carried out by indexers and moderators on a best-effort basis and are not responsible for content submitted by users.</P>
        <P n="5.3">Every venue submission is reviewed by an indexer before it goes live. We may decline any submission we believe breaches these terms, is inaccurate, or is harmful to the community.</P>
        <P n="5.4">Once a listing is published, we may edit or remove it (or any other content) on the same grounds, and may make minor edits at any time to keep the index accurate.</P>
        <P n="5.5">Before declining or removing a listing, we'll usually contact the submitter first. However, we reserve the right to act without prior notice where we consider it necessary.</P>
        <P n="5.6">We do not take formal positions on community drama, politics, or social divisions within the FFXIV community, and therein do not remove or restrict content for these reasons. Moderation actions are taken only in response to breaches of these terms.</P>

        <h2 className={S.h2} id="api">6. The public API</h2>
        <P n="6.1">FFXIV Venues provides a public API that exposes venue data for community use.</P>
        <P n="6.2">We provide API documentation at <A href="https://api.ffxivvenues.com/docs/v1.0">api.ffxivvenues.com/docs/v1.0</A>, which we keep up to date. Using endpoints outside of those documented is not recommended or supported, but still subject to the restrictions below.</P>
        <P n="6.3">You may use the API to build tools and integrations, provided you do so reasonably and within the limits set out below.</P>
        <P n="6.4">Requests are rate-limited to 3 calls per 10 seconds per IP address. This limit is shared across all activity from the same IP address, so you should account for any other integrations or applications you run that also call the API.</P>
        <P n="6.5">You must identify your integration at all times by setting a descriptive User-Agent header on every request.</P>
        <P n="6.6">The API targets 99.99% uptime. This is a service target that we aim for, not a guarantee. We hold no liability for any consequences arising from a failed, rate-limited, or blocked API request.</P>
        <P n="6.7">Your integration should make best efforts to handle unsuccessful requests gracefully, for example with sensible retries and back-off, including where a request is rate-limited or blocked for security reasons.</P>
        <P n="6.8">Within a given API version, we maintain backward compatibility and take reasonable measures to protect you from breaking changes.</P>
        <P n="6.9">Data obtained through the API remains subject to these terms and owned by the venue owners/managers who submitted it.</P>
        <P n="6.10">We may change, restrict, or withdraw API access at any time.</P>
        <P n="6.11">You may not use the API for Commercial purposes, including but not limited to:</P>
        <Sub n="6.11.1">Selling access to the API or the data it provides.</Sub>
        <Sub n="6.11.2">Offering paid access to functionality substantially powered by the API.</Sub>
        <Sub n="6.11.3">Using the API as a substantial or essential part, or as a primary value driver, of a commercial product or service.</Sub>
        <P n="6.12">The following uses are permitted, provided all other terms are met:</P>
        <Sub n="6.12.1">Personal use.</Sub>
        <Sub n="6.12.2">Hobby projects.</Sub>
        <Sub n="6.12.3">Nonprofit use.</Sub>
        <Sub n="6.12.4">Cost-recovery hosting.</Sub>

        <h2 className={S.h2} id="attribution">7. Attribution</h2>
        <P n="7.1">If your integration uses the API or the data it provides, you must attribute FFXIV Venues. Attribution is mandatory in all cases.</P>
        <P n="7.2">Where the API is used in a user-facing interface and provides a feature:</P>
        <Sub n="7.2.1">Attribution must appear at or near where that feature is used.</Sub>
        <Sub n="7.2.2">This requirement does not apply where our data constitutes only a minor part of that feature.</Sub>
        <P n="7.3">Where a credits file or equivalent exists, attribution must also appear there.</P>
        <P n="7.4">Where there is no user-facing interface and no credits file, attribution must appear somewhere reasonable.</P>
        <P n="7.5">Attribution must clearly identify FFXIV Venues as the original project and source.</P>

        <h2 className={S.h2} id="ip">8. Intellectual property</h2>
        <P n="8.1">FINAL FANTASY XIV is a registered trademark of Square Enix Holdings Co., Ltd. FFXIV Venues is an unofficial, fan-made project. It is not affiliated with, endorsed, sponsored, or approved by Square Enix.</P>
        <P n="8.2">Final Fantasy XIV game content and materials are the property of Square Enix and are used in accordance with Square Enix&rsquo;s fan-content and materials usage guidelines. All such rights remain with Square Enix.</P>
        <P n="8.3">The FFXIV Venues name, branding, website, bots, and source code (excluding user-submitted content and third-party materials) belong to us.</P>
        <P n="8.4">Except where it violates sections 4, user-submitted content and venues remain the property of their respective owners/managers.</P>

        <h2 className={S.h2} id="availability">9. Availability of service</h2>
        <P n="9.1">We provide the service on a non-commercial, best-effort basis. We may change, suspend, or discontinue any part of the service at any time, with or without notice.</P>
        <P n="9.2">We target 99.99% uptime for the service. This is a service target that we aim for, not a guarantee, and we do not guarantee that the service will be uninterrupted, error-free, or available at any particular time.</P>

        <h2 className={S.h2} id="disclaimers">10. Disclaimers</h2>
        <P n="10.1">The service and all content on it are provided &ldquo;as is&rdquo; and &ldquo;as available&rdquo;, without warranties of any kind, whether express or implied, to the fullest extent permitted by law.</P>
        <P n="10.2">We do not warrant the accuracy, completeness, or reliability of any venue listing or other user-submitted content. Venues are run by players and may change, move, or close without notice.</P>
        <P n="10.3">Any reliance you place on content from the service is at your own risk.</P>

        <h2 className={S.h2} id="liability">11. Limitation of liability</h2>
        <P n="11.1">FFXIV Venues is a free, non-commercial community project. To the fullest extent permitted by law, we are not liable for any loss or damage arising from your use of, or inability to use, the service, or from any content submitted by users.</P>

        <h2 className={S.h2} id="termination">12. Suspension and termination</h2>
        <P n="12.1">We may suspend or remove your access to the service, or remove your listings, if you breach these terms or where we reasonably consider it necessary to protect the service or its users.</P>
        <P n="12.2">You may stop using the service at any time, and may request removal of your listings and associated data as described in our <A href="/privacy">Privacy Policy</A>.</P>

        <h2 className={S.h2} id="changes">13. Changes to these terms</h2>
        <P n="13.1">We may update these terms from time to time. The effective date at the bottom of this document will always reflect the most recent revision. Continued use of the service after a revised version is posted constitutes acceptance of the updated terms.</P>
        <P n="13.2">You may offer and/or you may request changes to these terms on an adhoc basis in good faith and/or to recognise unique circumstances. Should you do this and terms are accepted, those terms will superseed. Terms in regards to our acceptable use and intelectual right of others are not negotiable.</P>

        <h2 className={S.h2} id="contact">14. Contact us</h2>
        <P n="14.1">If there are any questions, concerns, or requests relating to these terms, please <A href="https://discord.com/channels/942536163959406632/1188579990271434883">contact the team via a ticket</A> in the <A href="https://discord.gg/gTP65VYcMj">FFXIV Venues discord</A>.</P>

        <p className="text-right text-xs italic text-gray-500 mt-16">Effective 25<sup>th</sup> June 2026</p>
      </div>
    </DefaultPageLayout.Page>
  </DefaultPageLayout>
})

const P = ({ n, children }: { n: string, children: ReactNode }) => (
  <p className={S.p}>
    <span className={S.num}>{n}</span>
    <span>{children}</span>
  </p>
);

const Sub = ({ n, children }: { n: string, children: ReactNode }) => (
  <p className={S.sub}>
    <span className={S.num}>{n}</span>
    <span>{children}</span>
  </p>
);
