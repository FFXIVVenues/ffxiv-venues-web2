import {Trans, useLingui} from "@lingui/react/macro";
import {VenueForm} from "@/components/venueForm/venueForm.tsx";
import {VeniHeader} from "@/components/venueForm/veniHeader.tsx";
import {DefaultPageLayout} from "@/pageLayoutss/defaultPageLayout.tsx";
import type {VenueRequestDto} from "@/lib/services/venues2/dtos/venueDto.ts";
import {useState} from "react";
import {createVenue} from "@/lib/services/venues2/createVenue.ts";
import {toast} from "sonner";
import {saveError} from "@/components/venueForm/saveError.ts";

export const CreateVenuePage = () => {
    const {t} = useLingui();
    const [created, setCreated] = useState(false);

    const create = async (venue: VenueRequestDto) => {
        try {
            await createVenue(venue);
            setCreated(true);
        } catch (error) {
            toast.error(saveError(error));
        }
    };

    return <DefaultPageLayout title={t`Create a venue`}>
        <DefaultPageLayout.Page>
            <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
                <VeniHeader title={<Trans>Let's create your venue! <span aria-hidden="true">❤️</span></Trans>} subtitle={<Trans>Fill this in and I'll get your venue listed</Trans>} />
                {created
                    ? <p className="text-muted-foreground"><Trans>Thanks! I've sent your venue off for approval. You'll be able to edit it once it's been approved.</Trans></p>
                    : <VenueForm submitLabel={<Trans>Create venue</Trans>} onSubmit={create} />}
            </div>
        </DefaultPageLayout.Page>
    </DefaultPageLayout>;
};
