import {Trans, useLingui} from "@lingui/react/macro";
import {VeniHeader} from "@/components/venueForm/veniHeader.tsx";
import {useParams} from "react-router";
import {useEffect, useState} from "react";
import type {VenueDto} from "@/lib/services/venues/dtos/venueDto.ts";
import {venueService} from "@/lib/services/venues/venueService.ts";
import {NotFoundPage} from "@/pages/notFoundPage/notFoundPage.tsx";
import {type NewVenue, VenueForm} from "@/components/venueForm/venueForm.tsx";
import {DefaultPageLayout} from "@/pageLayoutss/defaultPageLayout.tsx";

export const EditVenuePage = () => {
    const {t} = useLingui();
    const {venueId = ""} = useParams();
    const [venue, setVenue] = useState<VenueDto | "loading" | "missing">("loading");

    useEffect(() => {
        setVenue("loading");
        venueService.getVenueDto(venueId)
            .then(loaded => setVenue(loaded ?? "missing"))
            .catch(() => setVenue("missing"));
    }, [venueId]);

    if (venue === "missing") return <NotFoundPage />;

    const save = (changes: NewVenue, banner: Blob | null) => {
        if (venue === "loading") return;
        console.log({...venue, ...changes, location: {...venue.location, ...changes.location}}, banner);
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