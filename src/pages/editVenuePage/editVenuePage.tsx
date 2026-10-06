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
import {saveError} from "@/components/venueForm/saveError.ts";
import {toDraft, toVenue} from "@/components/venueForm/venueDraft.ts";


export const EditVenuePage = () => {
    const {t} = useLingui();
    const {venueId = ""} = useParams();
    const [venue, setVenue] = useState<VenueDto | "loading" | "missing">("loading");

    useEffect(() => {
        setVenue("loading");
        getVenue(venueId)
            .then(loaded => setVenue(loaded ?? "missing"))
            .catch(() => setVenue("missing"));
    }, [venueId]);

    if (venue === "missing") return <NotFoundPage />;

    const save = async (next: VenueRequestDto) => {
        const original = toVenue(toDraft(venue as VenueDto));
        const changes = Object.fromEntries(Object.entries(next).filter(([key, value]) =>
            JSON.stringify(value) !== JSON.stringify(original[key as keyof VenueRequestDto])));
        try {
            await updateVenue(venueId, changes);
            toast.success(t`Saved! Your changes are live.`);
        } catch (error) {
            toast.error(saveError(error));
        }
    };

    return <DefaultPageLayout title={t`Edit venue`}>
        <DefaultPageLayout.Page>
            <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
                <VeniHeader title={<Trans>Let's update your venue! <span aria-hidden="true">❤️</span></Trans>} subtitle={<Trans>Change anything you like and I'll save it for you</Trans>} />
                {venue === "loading"
                    ? <p className="text-sm text-muted-foreground"><Trans>Fetching your venue...</Trans></p>
                    : <VenueForm venue={venue} submitLabel={<Trans>Save changes</Trans>} onSubmit={save} />}
            </div>
        </DefaultPageLayout.Page>
    </DefaultPageLayout>;
};