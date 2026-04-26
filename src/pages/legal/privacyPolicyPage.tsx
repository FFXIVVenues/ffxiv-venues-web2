import React, {memo, type ReactNode} from "react";
import {DefaultPageLayout} from "@/layouts/defaultPageLayout.tsx";
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
      <SidebarMenuButton className={S.m} render={<a href="#rights">8. User rights</a>}/>
      <SidebarMenuButton className={S.m} render={<a href="#security">9. Security</a>}/>
      <SidebarMenuButton className={S.m} render={<a href="#changes">10. Changes to this policy</a>}/>
      <SidebarMenuButton className={S.m} render={<a href="#contact">11. Contact us</a>}/>
    </DefaultPageLayout.Panel>
    <DefaultPageLayout.Page>
      <div className="max-w-3xl mx-auto px-6 py-12 text-sm leading-relaxed">

        <h1 className="text-3xl font-bold mb-1">Privacy Policy</h1>
        <p className="text-xs italic text-gray-500 mb-2">Applies to FFXIV Venues Site / API / Veni Ki / Ruby Ki</p>
        <hr className="mb-8" />

        <h2 className={S.h2} id="whoweare">1. Who we are</h2>
        <P n="1.1">FFXIV Venues is a community-run platform that allows Final Fantasy XIV players to discover and list in-game venues. The service is operated as a non-commercial community project, accessible at <A href="/">ffxivvenues.com</A>.</P>
        <P n="1.2">For any privacy-related enquiries, please <A href="https://discord.com/channels/942536163959406632/1188579990271434883">contact the team via a ticket</A> in the <A href="https://discord.gg/gTP65VYcMj">FFXIV Venues discord</A></P>

        <h2 className={S.h2} id="covers">2. What this policy covers</h2>
        <P n="2.1">This policy explains what personal data FFXIV Venues collects, why it is collected, how it is stored and protected, and the rights in relation to that data. This policy applies to the following categories of user:</P>
        <Sub n="2.1.1">Visitors who browse our sites.</Sub>
        <Sub n="2.1.2">Consumers of our API.</Sub>
        <Sub n="2.1.3">Venue owners who use our Discord bot, Veni Ki, to create and manage venue listings.</Sub>
        <Sub n="2.1.4">Users of our Discord bot, Ruby Ki, to use utility features such as anonymous posting.</Sub>
        <Sub n="2.1.5">Any user who submits a venue flag for moderation purposes.</Sub>

        <h2 className={S.h2} id="data">3. Data we collect and why</h2>
        <h3 className={S.h3}>3.1 Site visitors</h3>
        <h3 className={S.h3}>3.1.1 General browsing (and API usage)</h3>
        <P n="3.1.1.1">An account or login is not required to browse venue listings. Personal data is not deliberately collected for basic browsing; however, some limited technical data may be processed as a necessary consequence of operating the service.</P>
        <P n="3.1.1.2">IP address and request data (for example, timestamps and request urls) may be processed in server logs, and Cloudflare systems for network security, DDoS protection, troubleshooting, and performance monitoring. This data is not used to identify individuals.</P>
        <P n="3.1.1.3">Our lawful basis (where UK GDPR or EU GDPR applies) is legitimate interests in service performance and security.</P>

        <h3 className={S.h3}>3.1.2 Device-side features</h3>
        <P n="3.1.2.1">The site includes optional features such as rating a venue, marking it as a favourite, or adding personal notes. These features are stored entirely in the browser's local storage and are never transmitted to the servers. This data cannot be accessed by FFXIV Venues.</P>

        <h3 className={S.h3}>3.1.3 Site moderation (venue flags)</h3>
        <P n="3.1.3.1">Any user, including anonymous visitors, may submit a flag on a venue to report inaccurate information or inappropriate content. When a flag is submitted, we collect the following:</P>
        <Sub n="3.1.3.1.1">The flag type, selected from a predefined list.</Sub>
        <Sub n="3.1.3.1.2">An optional free-text description provided by the user.</Sub>
        <Sub n="3.1.3.1.3">A derived identifier: the IP address is irreversibly hashed and truncated before being stored. Original IP addresses cannot be reconstructed from this value. It is used only to correlate flags from the same source in order to detect spam or coordinated abuse, and cannot be used for individual identification.</Sub>
        <P n="3.1.3.2">Our lawful basis (where UK GDPR or EU GDPR applies) is legitimate interests in abuse prevention and data accuracy.</P>

        <h3 className={S.h3}>3.2 Veni Ki (venue owners)</h3>
        <P n="3.2.1">When a venue listing is created or managed using the Discord bot, Veni Ki, the following data is collected in order to provide and maintain that listing:</P>
        <Sub n="3.2.1.1">The user's Discord ID, used to associate the user with the venue and to verify ownership for edits or deletion.</Sub>
        <Sub n="3.2.1.2">The venue listing details provided, including (for example) venue name, location, description, schedule, and any other completed fields.</Sub>
        <P n="3.2.2">The information submitted is displayed back during the creation confirmation process, allowing for review of the stored data before it is saved.</P>
        <P n="3.2.3">Our lawful basis (where UK GDPR or EU GDPR applies) is:</P>
        <Sub n="3.2.3.1">The provision of service - taking steps at the user's request to create and maintain the venue listing.</Sub>
        <Sub n="3.2.3.2">Legitimate interests - contributing to community statistics (see section 3.4).</Sub>

        <h3 className={S.h3}>3.3 Ruby Ki</h3>
        <P n="3.3.1">Ruby Ki is a Discord bot providing utility functions for the FFXIV Venues community, including message anchoring, anonymity features, and minigames.</P>
        <P n="3.3.2">If the Ruby Ki anonymity feature is used to post messages, the following data is collected and stored for moderation and safety purposes:</P>
        <Sub n="3.3.2.1">The user's Discord ID.</Sub>
        <Sub n="3.3.2.2">The ID of the message(s) sent via the service.</Sub>
        <P n="3.3.3">This data is used solely to allow moderators to identify the source of messages in the event of a policy violation. It is not exposed to the public or other users. Access is restricted to community moderators and engineers for the purposes of moderation and service maintenance.</P>
        <P n="3.3.4">Our lawful basis (where UK GDPR or EU GDPR applies) is legitimate interests in maintaining a safe community environment and preventing abuse.</P>

        <h3 className={S.h3}>3.4 Statistics dashboard</h3>
        <P n="3.4.1">FFXIV Venues operates a statistics dashboard at <A href="https://stats.ffxivvenues.com/">stats.ffxivvenues.com</A> as an additional processing purpose for the venue profile data described in section 3.2. The dashboard presents both aggregate statistics and individual views; all data surfaced is the same as is publicly accessible via the main site.</P>
        <P n="3.4.2">Access is open to anyone who requests it via a Discord role. No additional personal data is collected or stored as a result of accessing the dashboard.</P>
        <P n="3.4.3">Our lawful basis (where UK GDPR or EU GDPR applies) is the provision of service:</P>
        <Sub n="3.4.3.1">Providing open statistics and trends on the venue market.</Sub>
        <Sub n="3.4.3.2">Aiding decisions on service improvements.</Sub>

        <h3 className={S.h3}>3.5 Staging site</h3>
        <P n="3.5.1">A separate version of the website is maintained at <A href="https://ffxivvenues.dev/">ffxivvenues.dev</A> to test new features and improvements before they are released to the main site.</P>
        <P n="3.5.2">In accessing this site, IP address and request data (for example, timestamps and request urls) may be processed in server logs, and Cloudflare systems for network security, DDoS protection, troubleshooting, and performance monitoring. This data is not used to identify individuals.</P>
        <P n="3.5.3">This staging site uses a copy of the live data to ensure that new updates work correctly and accurately with real-world information. To ensure isolation the data on the staging site is disconnected from your Discord account. This means that actions performed on the staging site will not affect your live data or result in messages being sent to you.</P>
        <P n="3.5.5">Our lawful basis (where UK GDPR or EU GDPR applies) is provision of service - ensuring service updates are stable, performant, and accurate.</P>

        <h3 className={S.h3}>3.6 Support tickets (Ticket Tool)</h3>
        <P n="3.6.1">If a support ticket is opened in the Discord server, the information provided within that ticket is collected and stored via Ticket Tool. This is used to respond to the enquiry, manage community escalations, and maintain an audit record of changes made by request.</P>
        <P n="3.6.2">The data collected includes:</P>
        <Sub n="3.6.2.1">The user's Discord ID.</Sub>
        <Sub n="3.6.2.2">The content of messages, including any information shared in the ticket.</Sub>
        <Sub n="3.6.2.3">Timestamps and ticket status history.</Sub>
        <P n="3.6.3">Our lawful basis (where UK GDPR or EU GDPR applies) is:</P>
        <Sub n="3.6.3.1">The provision of service - responding to the request or enquiry.</Sub>
        <Sub n="3.6.3.2">Legitimate interests - maintaining an audit record of escalations and venue changes.</Sub>

        <h2 className={S.h2} id="cookies">4. Cookies and local storage</h2>
        <P n="4.1">FFXIV Venues uses a small number of essential cookies and browser local storage. These are strictly necessary for the site to function correctly (for example, maintaining session state and load balancing) and are not used for advertising or behavioural tracking.</P>
        <P n="4.2">Essential Cloudflare cookies (for example, cf_clearance and __cflb) are set by our network provider for security and load balancing. We do not use these for analytics, advertising, or cross-site tracking.</P>
        <P n="4.3">Browser local storage is used only for the optional device-side features described in section 3.2. This data remains on the device and is never transmitted to FFXIV Venues.</P>
        <P n="4.4">We do not use analytics cookies, marketing cookies, or any form of cross-site tracking.</P>

        <h2 className={S.h2} id="thirdparty">5. Third-party services</h2>
        <P n="5.1">We use a small number of third-party services to operate the platform. These providers may process limited technical data as a necessary consequence of delivering the service. We do not sell personal data to any third party.</P>

        <P n="5.2">Cloudflare routes traffic to ffxivvenues.com and provides CDN, DDoS protection, and network security services.</P>
        <Sub n="5.2.1">Data processed: IP address, request-level technical data, and venue video/image.</Sub>
        <Sub n="5.2.2"><span className="font-semibold">Privacy policy: </span><A href="https://www.cloudflare.com/privacypolicy/">https://www.cloudflare.com/privacypolicy/</A></Sub>

        <P n="5.3">Hetzner hosts our servers in the European Union and acts as our infrastructure provider. Hetzner does not have access to application-level venue data.</P>
        <Sub n="5.3.1">Data processed: server-level infrastructure data only.</Sub>
        <Sub n="5.3.2"><span className="font-semibold">Privacy policy: </span><A href="https://www.hetzner.com/legal/privacy-policy">https://www.hetzner.com/legal/privacy-policy</A></Sub>

        <P n="5.4">Discord is used as the community messaging platform and to interact with the bots, Veni Ki and Ruby Ki. Discord user IDs are processed and stored as described in sections 3.2 and 3.3. Discord also processes data under its own policies during community messaging or bot interaction.</P>
        <Sub n="5.4.1">Data processed: Discord ID, server-level technical data, and messages and interactions with bots and in the Discord server.</Sub>
        <Sub n="5.4.2"><span className="font-semibold">Privacy policy: </span><A href="https://discord.com/privacy">https://discord.com/privacy</A></Sub>

        <P n="5.5">Ticket Tool is a Discord bot that runs the support ticket system within the Discord community server. It collects and stores conversations within those tickets perpetually as transcripts, as an audit record of escalations and changes made by request. These transcripts can be removed upon request as described in section 8.</P>
        <Sub n="5.5.1">Data processed: Discord ID, message content, and timestamps within support tickets.</Sub>
        <Sub n="5.5.2"><span className="font-semibold">Privacy policy: </span><A href="https://tickettool.xyz/privacy">https://tickettool.xyz/privacy</A></Sub>

        <P n="5.6">Microsoft Cognitive Services provides intent classification services for Veni Ki. Messages sent to the bot are processed to identify intent and enable conversational interactions.</P>
        <Sub n="5.6.1">Data processed: message content sent to Veni Ki.</Sub>
        <Sub n="5.6.2"><span className="font-semibold">Privacy policy: </span><A href="https://privacy.microsoft.com/en-us/privacystatement">https://privacy.microsoft.com/en-us/privacystatement</A></Sub>

        <P n="5.7">Betterstack is used as a centralized logging service for our services, for the purposes of troubleshooting and performance monitoring.</P>
        <Sub n="5.7.1">Data processed: server logs including request-level technical data, and message content sent to Veni Ki.</Sub>
        <Sub n="5.7.2"><span className="font-semibold">Privacy policy: </span><A href="https://betterstack.com/privacy">https://betterstack.com/privacy</A></Sub>

        <h2 className={S.h2} id="retention">6. Data retention</h2>
        <P n="6.1">Server, Betterstack, and Cloudflare logs (including IP addresses) are retained for short periods in line with standard infrastructure practices and are then automatically deleted.</P>
        <P n="6.2">Venue profile data: venue listings and associated Discord IDs are retained for as long as the venue listing remains active and confirmed. Periodically venue owners/managers will be prompted to review data correctness and confirm venue details; if the prompt is unanswered the data is automatically deleted. If a venue is deleted, the data is held in an inactive state for up to six months to allow restoration at the venue owner's request. To have venue data permanently and immediately erased rather than held for restoration, a deletion request must be submitted as described in section 8.</P>
        <P n="6.3">Flag data, including hashed IP identifiers, is retained for as long as is reasonably necessary for moderation purposes.</P>
        <P n="6.4">Ticket transcripts: conversations within support tickets are stored perpetually by Ticket Tool as an audit record of community interactions and account changes. These can be removed upon request (see section 8).</P>
        <P n="6.5">Device-side data (favourites, visited status, ratings, and notes) is stored indefinitely in the browser's local storage until removal. This data never leaves the device and FFXIV Venues has no access to it or control over it.</P>
        <P n="6.6">Backups: automated hourly backups are retained with our infrastructure providers for up to six months for disaster recovery purposes. Data deleted from the live service may persist in backups until those backups expire. We do not selectively remove individual records from backup archives.</P>

        <h2 className={S.h2} id="transfers">7. International data transfers</h2>
        <P n="7.1">Our servers are located in the European Union (Hetzner). Cloudflare operates a global network, which means request-level data may be processed in multiple countries as part of standard network routing. Cloudflare maintains appropriate data transfer mechanisms in accordance with applicable law.</P>
        <P n="7.2">For users located outside the EU or UK, data may be transferred to and processed in countries with different data protection standards. Use of FFXIV Venues constitutes acknowledgment of this.</P>

        <h2 className={S.h2} id="rights">8. User rights</h2>
        <P n="8.1">Depending on the jurisdiction, the following rights may apply in relation to personal data:</P>
        <Sub n="8.1.1"><span className="font-semibold">Right of access:</span> to request a copy of the data held about the user.</Sub>
        <Sub n="8.1.2"><span className="font-semibold">Right to rectification:</span> to ask us to correct inaccurate data.</Sub>
        <Sub n="8.1.3"><span className="font-semibold">Right to erasure:</span> to request deletion of data, for example a venue listing and associated Discord ID.</Sub>
        <Sub n="8.1.4"><span className="font-semibold">Right to restrict processing:</span> in certain circumstances.</Sub>
        <Sub n="8.1.5"><span className="font-semibold">Right to object:</span> to processing carried out on the basis of legitimate interests.</Sub>
        <Sub n="8.1.6"><span className="font-semibold">Right to data portability:</span> where technically feasible.</Sub>
        <Sub n="8.1.7"><span className="font-semibold">Right to lodge a complaint:</span> with a data protection authority (for example, the ICO in the UK).</Sub>
        <P n="8.2">To exercise any of these rights, <A href="https://discord.com/channels/942536163959406632/1188579990271434883">contact the team via a ticket</A> in the <A href="https://discord.gg/gTP65VYcMj">FFXIV Venues discord</A>. Verification of identity may be required before acting on a request.</P>

        <h2 className={S.h2} id="security">9. Security</h2>
        <P n="9.1">We take reasonable technical measures to protect the data we hold. </P>
        <Sub n="9.1.1"><span className="font-semibold">Infrastructure security:</span> hosting and edge protection are provided by reputable providers (Hetzner and Cloudflare).</Sub>
        <Sub n="9.1.2"><span className="font-semibold">Secure practice policies:</span> staff protect and maintain secure authentication on their account, and know how to handle a potential breach to protect data.</Sub>
        <Sub n="9.1.3"><span className="font-semibold">Backups:</span> automated hourly backups are stored securely for service continuity and retained for up to six months.</Sub>
        <Sub n="9.1.4"><span className="font-semibold">Access controls:</span> access to systems and data is limited to what is strictly necessary to operate the service.</Sub>
        <Sub n="9.1.5"><span className="font-semibold">Platform security:</span> configuration of platforms and services are set for rigid security and service protection.</Sub>
        <Sub n="9.1.6"><span className="font-semibold">Network isolation:</span> services and data are not open or addressable by usual means, placed behind multiple network isolation layers.</Sub>
        <Sub n="9.1.7"><span className="font-semibold">Proactive system monitoring:</span> implementation of multiple SIEM and XDR systems and techniques to ensure the service and data is protected.</Sub>
        <Sub n="9.1.8"><span className="font-semibold">Proactive data monitoring:</span> implementation of data change monitoring to detect anomalies and protect data.</Sub>

        <h2 className={S.h2} id="changes">10. Changes to this policy</h2>
        <P n="10.1">This policy may be updated from time to time. The effective date at the bottom of this document will always reflect the most recent revision. Periodic review of this policy is encouraged. Continued use of FFXIV Venues after a revised policy is posted constitutes acceptance of the updated policy.</P>

        <h2 className={S.h2} id="contact">11. Contact us</h2>
        <P n="11.1">If there are any questions, concerns, or requests relating to this privacy policy or personal data, please <A href="https://discord.com/channels/942536163959406632/1188579990271434883">contact the team via a ticket</A> in the <A href="https://discord.gg/gTP65VYcMj">FFXIV Venues discord</A>.</P>

        <p className="text-right text-xs italic text-gray-500 mt-16">Effective 23<sup>rd</sup> April 2026</p>
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