import {Trans, useLingui} from "@lingui/react/macro";
import {VenueForm} from "@/components/venueForm/venueForm.tsx";
import {VeniHeader} from "@/components/venueForm/veniHeader.tsx";
import {DefaultPageLayout} from "@/pageLayoutss/defaultPageLayout.tsx";
import type {VenueRequestDto} from "@/lib/services/venues2/dtos/venueDto.ts";
import {useState} from "react";
import {Link} from "react-router";
import {createVenue} from "@/lib/services/venues2/createVenue.ts";
import {uploadBanner} from "@/lib/services/venues2/uploadBanner.ts";
import {toast} from "sonner";
import {LoginPrompt} from "@/components/venueForm/loginPrompt.tsx";
import {NoUser, useUser} from "@/lib/services/useUser.ts";

export const CreateVenuePage = () => {
    const {t} = useLingui();
    const user = useUser();
    const [created, setCreated] = useState(false);

    const create = async (venue: VenueRequestDto, banner: Blob | null) => {
        const {id} = await createVenue(venue);
        setCreated(true);
        if (banner) await uploadBanner(id, banner).catch(() => toast.error(t`Your venue was created, but the banner didn't upload. You can add it when you edit your venue.`));
    };

    return <DefaultPageLayout title={t`Create a venue`}>
        <DefaultPageLayout.Page>
            <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
                <VeniHeader title={<Trans>Let's create your venue! <span aria-hidden="true">❤️</span></Trans>} subtitle={<Trans>Fill this in and I'll get your venue listed</Trans>} />
                {user === null
                    ? <p className="text-sm text-muted-foreground"><Trans>Checking you're logged in...</Trans></p>
                    : user === NoUser
                    ? <LoginPrompt />
                    : created
                    ? <p className="text-muted-foreground"><Trans>Thanks! I've sent your venue off for approval. You can still make changes while you wait from <Link to="/venue/manage" className="underline">your venues</Link>.</Trans></p>
                    : <VenueForm submitLabel={<Trans>Create venue</Trans>} onSubmit={create} />}
            </div>
        </DefaultPageLayout.Page>
    </DefaultPageLayout>;
};
