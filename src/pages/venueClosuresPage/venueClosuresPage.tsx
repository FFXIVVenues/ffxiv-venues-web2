import {Trans, useLingui} from "@lingui/react/macro";
import {useNavigate, useParams} from "react-router";
import {ArrowLeft} from "lucide-react";
import {NotFoundPage} from "@/pages/notFoundPage/notFoundPage.tsx";
import {DefaultPageLayout} from "@/pageLayouts/defaultPageLayout.tsx";
import {VeniHeader} from "@/components/venueForm/veniHeader.tsx";
import {LoginPrompt} from "@/components/venueForm/loginPrompt.tsx";
import {NoUser, useUser} from "@/lib/services/user/useUser.ts";
import {Button} from "@/components/ui/shadcn/button.tsx";
import {useScheduleOverrides} from "@/components/scheduleOverrides/useScheduleOverrides.ts";
import {OverrideForm} from "@/components/scheduleOverrides/overrideForm.tsx";
import {OverridesTable} from "@/components/scheduleOverrides/overridesTable.tsx";

export const VenueClosuresPage = () => {
    const {t} = useLingui();
    const navigate = useNavigate();
    const {venueId = ""} = useParams();
    const user = useUser();
    const {venue, overrides, saving, add, cancel} = useScheduleOverrides(venueId);

    if (venue === "missing") return <NotFoundPage />;

    return <DefaultPageLayout title={t`Closures`}>
        <DefaultPageLayout.Panel>
            <Button variant="ghost" className="cursor-pointer w-full justify-start items-center gap-2 py-4" onClick={() => navigate(`/venue/manage`)}>
                <ArrowLeft className="size-4"/>
                <span className="mt-0.5"><Trans>Back to my venues</Trans></span>
            </Button>
        </DefaultPageLayout.Panel>
        <DefaultPageLayout.Page>
            <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
                <VeniHeader title={<Trans>Taking a break? <span aria-hidden="true">🌙</span></Trans>} subtitle={<Trans>Tell me when you're closed and I'll let everyone know</Trans>} />
                {user === null || venue === "loading"
                    ? <VenueClosuresLoading />
                    : user === NoUser
                    ? <LoginPrompt />
                    : !venue.managers.includes(user.userId)
                    ? <VenueClosuresNotManager />
                    : <>
                        <OverrideForm open={false} defaultHours={24} overrides={overrides} saving={saving} onAdd={closure => add(closure, t`Saved! Your closure is live.`)} />
                        <OverridesTable overrides={overrides} saving={saving} onCancel={cancel} />
                    </>}
            </div>
        </DefaultPageLayout.Page>
    </DefaultPageLayout>;
};

function VenueClosuresLoading() {
    return <p className="text-sm text-muted-foreground"><Trans>Fetching your venue...</Trans></p>;
}

function VenueClosuresNotManager() {
    return <p className="text-muted-foreground"><Trans>You don't manage this venue, so I can't let you change its closures. If you think you should, ask one of its managers to add you.</Trans></p>;
}
