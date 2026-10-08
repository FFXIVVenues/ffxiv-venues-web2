import {Trans, useLingui} from "@lingui/react/macro";
import {VeniHeader} from "@/components/venueForm/veniHeader.tsx";
import {useParams} from "react-router";
import {useEffect, useState} from "react";
import type {VenueDto, VenueRequestDto} from "@/lib/services/venues2/dtos/venueDto.ts";
import {getVenue} from "@/lib/services/venues2/getVenue.ts";
import {NotFoundPage} from "@/pages/notFoundPage/notFoundPage.tsx";
import {VenueForm} from "@/components/venueForm/venueForm.tsx";
import {DefaultPageLayout} from "@/pageLayoutss/defaultPageLayout.tsx";
import {updateVenue} from "@/lib/services/venues2/updateVenue.ts";
import {toast} from "sonner";
import {toDraft, toVenue} from "@/components/venueForm/venueDraft.ts";
import {uploadBanner} from "@/lib/services/venues2/uploadBanner.ts";
import {LoginPrompt} from "@/components/venueForm/loginPrompt.tsx";
import {NoUser, useUser} from "@/lib/services/useUser.ts";


export const EditVenuePage = () => {
    const {t} = useLingui();
    const {venueId = ""} = useParams();
    const user = useUser();
    const [venue, setVenue] = useState<VenueDto | "loading" | "missing">("loading");

    useEffect(() => {
        setVenue("loading");
        getVenue(venueId)
            .then(loaded => setVenue(loaded ?? "missing"))
            .catch(() => setVenue("missing"));
    }, [venueId]);

    if (venue === "missing") return <NotFoundPage />;

    const save = async (next: VenueRequestDto, banner: Blob | null) => {
        const original = toVenue(toDraft(venue as VenueDto));
        const changes = Object.fromEntries(Object.entries(next).filter(([key, value]) =>
            JSON.stringify(value) !== JSON.stringify(original[key as keyof VenueRequestDto])));
        await updateVenue(venueId, changes);
        if (banner) await uploadBanner(venueId, banner);
        toast.success(t`Saved! Your changes are live.`);
    };

    return <DefaultPageLayout title={t`Edit venue`}>
        <DefaultPageLayout.Page>
            <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
                <VeniHeader title={<Trans>Let's update your venue! <span aria-hidden="true">❤️</span></Trans>} subtitle={<Trans>Change anything you like and I'll save it for you</Trans>} />
                {user === null || venue === "loading"
                    ? <p className="text-sm text-muted-foreground"><Trans>Fetching your venue...</Trans></p>
                    : user === NoUser
                    ? <LoginPrompt />
                    : !venue.managers.includes(user.userId)
                    ? <p className="text-muted-foreground"><Trans>You don't manage this venue, so I can't let you edit it. If you think you should, ask one of its managers to add you.</Trans></p>
                    : <VenueForm venue={venue} submitLabel={<Trans>Save changes</Trans>} onSubmit={save} />}
            </div>
        </DefaultPageLayout.Page>
    </DefaultPageLayout>;
};