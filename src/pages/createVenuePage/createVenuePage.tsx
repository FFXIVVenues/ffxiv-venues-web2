import {Trans, useLingui} from "@lingui/react/macro";
import {VenueForm} from "@/components/venueForm/venueForm.tsx";
import {VeniHeader} from "@/components/venueForm/veniHeader.tsx";
import {DefaultPageLayout} from "@/pageLayoutss/defaultPageLayout.tsx";
import type {VenueRequestDto} from "@/lib/services/venues2/dtos/venueDto.ts";

export const CreateVenuePage = () => {
    const {t} = useLingui();
    const create = (venue: VenueRequestDto, banner: Blob | null) => console.log(venue, banner);

    return <DefaultPageLayout title={t`Create a venue`}>
        <DefaultPageLayout.Page>
            <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
                <VeniHeader title={<Trans>Let's create your venue! <span aria-hidden="true">❤️</span></Trans>} subtitle={<Trans>Fill this in and I'll get your venue listed</Trans>} />
                <VenueForm submitLabel={<Trans>Create venue</Trans>} onSubmit={create} />
            </div>
        </DefaultPageLayout.Page>
    </DefaultPageLayout>;
};
