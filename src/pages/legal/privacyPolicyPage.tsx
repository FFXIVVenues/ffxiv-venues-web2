import React, {memo, type ReactNode} from "react";
import {DefaultPageLayout} from "@/layouts/defaultPageLayout.tsx";
import {SidebarMenuButton} from "@/components/ui/sidebar.tsx";

const S = {
  m: "mx-2 w-auto -mt-1/2",
  h2: "text-xl font-semibold mt-10 mb-2",
  h3: "text-base font-semibold mt-6 mb-2",
  p: "flex gap-4 mb-2 text-sm leading-relaxed",
  num: "font-semibold shrink-0",
  sub: "flex gap-4 mb-1.5 text-sm leading-relaxed pl-8",
  a: "underline underline-offset-2 hover:opacity-70 transition-opacity",
};

export const PrivacyPolicyPage = memo(() => {
  return <DefaultPageLayout>
    <DefaultPageLayout.Panel>
      <SidebarMenuButton className={S.m} render={<a href="#whoweare">1. Who we are</a>}/>
      <SidebarMenuButton className={S.m} render={<a href="#covers">2. What this policy covers</a>}/>
      <SidebarMenuButton className={S.m} render={<a href="#data">3. Data we collect and why</a>}/>
      <SidebarMenuButton className={S.m} render={<a href="#cookies">4. Cookies and local storage</a>}/>
      <SidebarMenuButton className={S.m} render={<a href="#thirdparty">5. Third-party services</a>}/>
      <SidebarMenuButton className={S.m} render={<a href="#retention">6. Data retention</a>}/>
      <SidebarMenuButton className={S.m} render={<a href="#transfers">7. International data transfers</a>}/>
      <SidebarMenuButton className={S.m} render={<a href="#rights">8. Your rights</a>}/>
      <SidebarMenuButton className={S.m} render={<a href="#security">9. Security</a>}/>
      <SidebarMenuButton className={S.m} render={<a href="#changes">10. Changes to this policy</a>}/>
      <SidebarMenuButton className={S.m} render={<a href="#contact">11. Contact us</a>}/>
    </DefaultPageLayout.Panel>
    <DefaultPageLayout.Page>
      <div className="max-w-3xl mx-auto px-6 py-12 text-sm leading-relaxed">

        {/* Title block */}
        <h1 className="text-3xl font-bold mb-1">Privacy Policy</h1>
        <p className="text-xs italic text-gray-500 mb-2">Applies to FFXIV Venues Site / API / Veni Ki</p>
        <hr className="mb-8" />

        <a id="whoweare"/>
        <h2 className={S.h2}>1. Who we are</h2>
        <P n="1.1">FFXIV Venues is a community-run platform that allows Final Fantasy XIV players to discover and list in-game venues. The service is operated as a non-commercial community project, accessible at <A href="/">ffxivvenues.com</A>.</P>
        <P n="1.2">For any privacy-related enquiries, please <A href="https://discord.com/channels/942536163959406632/1188579990271434883">contact us via a ticket</A> in the <A href="https://discord.gg/gTP65VYcMj">FFXIV Venues discord</A></P>

        <a id="covers"/>
        <h2 className={S.h2}>2. What this policy covers</h2>
        <P n="2.1">This policy explains what personal data FFXIV Venues collects, why we collect it, how it is stored and protected, and your rights in relation to that data. This policy applies to the following categories of user:</P>
        <Sub n="2.1.1">Visitors who browse our site.</Sub>
        <Sub n="2.1.2">Consumers of our API.</Sub>
        <Sub n="2.1.3">Venue owners who use our Discord bot, Veni Ki, to create and manage venue listings.</Sub>
        <Sub n="2.1.4">Any user who submits a venue flag for moderation purposes.</Sub>

        <a id="data"/>
        <h2 className={S.h2}>3. Data we collect and why</h2>
        <h3 className={S.h3}>3.1 Site visitors</h3>
        <h3 className={S.h3}>3.1.1 General browsing (and API usage)</h3>
        <P n="3.1.1.1">You do not need an account or login to browse venue listings. We do not deliberately collect personal data for basic browsing; however, some limited technical data may be processed as a necessary consequence of operating the service.</P>
        <P n="3.1.1.2">IP address and request data (for example, timestamps and requested pages) may be processed in server logs and Cloudflare systems for network security, DDoS protection, troubleshooting, and performance monitoring. This data is not used to identify individuals.</P>
        <P n="3.1.1.3">Our lawful basis (where UK GDPR or EU GDPR applies) is legitimate interests in service performance and security.</P>

        <h3 className={S.h3}>3.1.2 Site features stored on your device</h3>
        <P n="3.1.2.1">The site includes optional features such as rating a venue, marking it as a favourite, or adding personal notes. These features are stored entirely in your browser's local storage and are never transmitted to our servers. We cannot access this data.</P>

        <h3 className={S.h3}>3.1.3 Site moderation (venue flags)</h3>
        <P n="3.1.3.1">Any user, including anonymous visitors, may submit a flag on a venue to report inaccurate information or inappropriate content. When a flag is submitted, we collect the following:</P>
        <Sub n="3.1.3.1.1">The flag type, selected from a predefined list.</Sub>
        <Sub n="3.1.3.1.2">An optional free-text description you choose to provide.</Sub>
        <Sub n="3.1.3.1.3">A derived identifier: your IP address is irreversibly hashed and truncated before being stored. We cannot reconstruct your original IP address from this value. It is used only to correlate flags from the same source in order to detect spam or coordinated abuse, and cannot be used to identify you.</Sub>
        <P n="3.1.3.2">Our lawful basis (where UK GDPR or EU GDPR applies) is legitimate interests in abuse prevention.</P>

        <h3 className={S.h3}>3.2 Veni Ki (venue owners)</h3>
        <P n="3.2.1">If you choose to create or manage a venue listing using our Discord bot, Veni Ki, we collect the following data in order to provide and maintain that listing:</P>
        <Sub n="3.2.1.1">Your Discord user ID, used to associate you with your venue and to verify ownership for edits or deletion.</Sub>
        <Sub n="3.2.1.2">The venue listing details you provide, including (for example) venue name, location, description, schedule, and any other fields you complete.</Sub>
        <P n="3.2.2">The information you submit is displayed back to you during the creation confirmation process, so you can review exactly what will be stored before it is saved.</P>
        <P n="3.2.3">Our lawful basis (where UK GDPR or EU GDPR applies) is:</P>
        <Sub n="3.2.3.1">The provision of service - taking steps at your request to create and maintain your venue listing.</Sub>
        <Sub n="3.2.3.2">Legitimate interests - contributing to community statistics (see section 3.3).</Sub>

        <h3 className={S.h3}>3.3 Statistics dashboard</h3>
        <P n="3.3.1">FFXIV Venues operates a statistics dashboard at <A href="https://stats.ffxivvenues.com/">stats.ffxivvenues.com</A> as an additional processing purpose for the venue profile data described in section 3.2. The dashboard presents both aggregate statistics and individual views; all data surfaced is already publicly accessible via the main site.</P>
        <P n="3.3.2">Access is open to anyone who requests it via a Discord role. No additional personal data is collected or stored as a result of accessing the dashboard.</P>
        <P n="3.3.3">Our lawful basis (where UK GDPR or EU GDPR applies) is the provision of service:</P>
        <Sub n="3.3.3.1">Providing open statistics and trends on the venue market.</Sub>
        <Sub n="3.3.3.2">Aiding decisions on service improvements.</Sub>

        <a id="cookies"/>
        <h2 className={S.h2}>4. Cookies and local storage</h2>
        <P n="4.1">FFXIV Venues uses a small number of essential cookies and browser local storage. These are strictly necessary for the site to function correctly (for example, maintaining session state and load balancing) and are not used for advertising or behavioural tracking.</P>
        <P n="4.2">Essential Cloudflare cookies (for example, cf_clearance and __cflb) are set by our network provider for security and load balancing. We do not use these for analytics, advertising, or cross-site tracking.</P>
        <P n="4.3">Browser local storage is used only for the optional device-side features described in section 3.2. This data remains on your device and is never transmitted to us.</P>
        <P n="4.4">We do not use analytics cookies, marketing cookies, or any form of cross-site tracking.</P>

        <a id="thirdparty"/>
        <h2 className={S.h2}>5. Third-party services</h2>
        <P n="5.1">We use a small number of third-party services to operate the platform. These providers may process limited technical data as a necessary consequence of delivering the service. We do not sell personal data to any third party.</P>

        <P n="5.2">Cloudflare routes traffic to ffxivvenues.com and provides CDN, DDoS protection, and network security services.</P>
        <Sub n="5.2.1">Data processed: IP address, request-level technical data, and venue video/image.</Sub>
        <Sub n="5.2.2"><span className="font-semibold">Privacy policy: </span><A href="https://www.cloudflare.com/privacypolicy/">https://www.cloudflare.com/privacypolicy/</A></Sub>

        <P n="5.3">Hetzner hosts our servers in the European Union and acts as our infrastructure provider. Hetzner does not have access to application-level venue data.</P>
        <Sub n="5.3.1">Data processed: server-level infrastructure data only.</Sub>
        <Sub n="5.3.2"><span className="font-semibold">Privacy policy: </span><A href="https://www.hetzner.com/legal/privacy-policy">https://www.hetzner.com/legal/privacy-policy</A></Sub>

        <P n="5.4">Discord is used to create and manage venue listings via our bot, Veni Ki. Your Discord user ID is processed and stored by us as described in section 3.2. Discord also processes your data under its own policies when you interact with the bot.</P>
        <Sub n="5.4.1">Data processed: Discord user ID, server-level technical data, and messages and interactions with Veni Ki and in our Discord server.</Sub>
        <Sub n="5.4.2"><span className="font-semibold">Privacy policy: </span><A href="https://discord.com/privacy">https://discord.com/privacy</A></Sub>

        <a id="retention"/>
        <h2 className={S.h2}>6. Data retention</h2>
        <P n="6.1">Server and Cloudflare logs (including IP addresses) are retained for short periods in line with standard infrastructure practices and are then automatically deleted.</P>
        <P n="6.2">Venue profile data: venue listings and associated Discord user IDs are retained for as long as the venue listing remains active and confirmed. Periodically venue owners/managers will be prompted to review data correctness and confirm venue details, if the prompt is unanswered the data is automatically deleted. If a venue is deleted, the data is held in an inactive state for up to six months to allow restoration at the venue owner's request. If you wish your venue data to be permanently and immediately erased rather than held for restoration, you must submit a deletion request as described in section 8.</P>
        <P n="6.3">Flag data, including hashed IP identifiers, is retained for as long as is reasonably necessary for moderation purposes.</P>
        <P n="6.4">Device-side data (favourites, visited status, ratings, and notes) is stored indefinitely in your browser's local storage until you choose to remove it. This data never leaves your device and we have no access to it or control over it.</P>
        <P n="6.5">Backups: automated hourly backups are retained with our infrastructure providers for up to six months for disaster recovery purposes. Data deleted from the live service may persist in backups until those backups expire. We do not selectively remove individual records from backup archives.</P>

        <a id="transfers"/>
        <h2 className={S.h2}>7. International data transfers</h2>
        <P n="7.1">Our servers are located in the European Union (Hetzner). Cloudflare operates a global network, which means request-level data may be processed in multiple countries as part of standard network routing. Cloudflare maintains appropriate data transfer mechanisms in accordance with applicable law.</P>
        <P n="7.2">If you are located outside the EU or UK, your data may be transferred to and processed in countries with different data protection standards. By using FFXIV Venues, you acknowledge this.</P>

        <a id="rights"/>
        <h2 className={S.h2}>8. Your rights</h2>
        <P n="8.1">Depending on your jurisdiction, you may have the following rights in relation to your personal data:</P>
        <Sub n="8.1.1"><span className="font-semibold">Right of access:</span> to request a copy of the data we hold about you.</Sub>
        <Sub n="8.1.2"><span className="font-semibold">Right to rectification:</span> to ask us to correct inaccurate data.</Sub>
        <Sub n="8.1.3"><span className="font-semibold">Right to erasure:</span> to request deletion of your data, for example your venue listing and associated Discord user ID.</Sub>
        <Sub n="8.1.4"><span className="font-semibold">Right to restrict processing:</span> in certain circumstances.</Sub>
        <Sub n="8.1.5"><span className="font-semibold">Right to object:</span> to processing carried out on the basis of legitimate interests.</Sub>
        <Sub n="8.1.6"><span className="font-semibold">Right to data portability:</span> where technically feasible.</Sub>
        <P n="8.2">To exercise any of these rights, please <A href="https://discord.com/channels/942536163959406632/1188579990271434883">contact us via a ticket</A> in the <A href="https://discord.gg/gTP65VYcMj">FFXIV Venues discord</A>. We will respond within 30 days. We may need to verify your identity before acting on a request.</P>

        <a id="security"/>
        <h2 className={S.h2}>9. Security</h2>
        <P n="9.1">We take reasonable technical measures to protect the data we hold. These include:</P>
        <Sub n="9.1.1"><span className="font-semibold">Infrastructure security:</span> hosting and edge protection are provided by reputable providers (Hetzner and Cloudflare).</Sub>
        <Sub n="9.1.2"><span className="font-semibold">Flag privacy:</span> IP addresses submitted with flag reports are irreversibly hashed and truncated before storage; the original address cannot be recovered.</Sub>
        <Sub n="9.1.3"><span className="font-semibold">Backups:</span> automated hourly backups are stored securely for service continuity and retained for up to six months.</Sub>
        <Sub n="9.1.4"><span className="font-semibold">Access controls:</span> access to systems and data is limited to what is strictly necessary to operate the service.</Sub>
        <P n="9.2">No method of transmission or storage is completely secure, and we cannot guarantee absolute security. We will notify affected individuals and relevant authorities of any data breach as required by applicable law.</P>

        <a id="changes"/>
        <h2 className={S.h2}>10. Changes to this policy</h2>
        <P n="10.1">We may update this policy from time to time. The effective date at the bottom of this document will always reflect the most recent revision. We encourage you to review this policy periodically. Continued use of FFXIV Venues after a revised policy is posted constitutes acceptance of the updated policy.</P>

        <a id="contact"/>
        <h2 className={S.h2}>11. Contact us</h2>
        <P n="11.1">If you have any questions, concerns, or requests relating to this privacy policy or your personal data, please <A href="https://discord.com/channels/942536163959406632/1188579990271434883">contact us via a ticket</A> in the <A href="https://discord.gg/gTP65VYcMj">FFXIV Venues discord</A>.</P>

        <p className="text-right text-xs italic text-gray-500 mt-16">Effective date: 15<sup>th</sup> April 2026</p>
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

const A = ({ href, children }: { href: string, children: ReactNode }) => (
  <a href={href} className={S.a} target="_blank" rel="noopener noreferrer">
    {children}
  </a>
);