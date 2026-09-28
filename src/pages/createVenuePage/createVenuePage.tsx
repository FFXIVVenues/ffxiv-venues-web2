import {Trans, useLingui} from "@lingui/react/macro";
import {type NewVenue, VenueForm} from "@/components/venueForm/venueForm.tsx";
import {DefaultPageLayout} from "@/pageLayoutss/defaultPageLayout.tsx";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/shadcn/avatar.tsx";
import veni from "@/assets/veni.webp";

export const CreateVenuePage = () => {
    const {t} = useLingui();
    const create = (venue: NewVenue, banner: Blob | null) => console.log(venue, banner);

    return <DefaultPageLayout title={t`Create a venue`}>
        <DefaultPageLayout.Page>
            <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
                <div className="flex items-center gap-3 mb-8">
                    <Avatar>
                        <AvatarImage src={veni} alt="Veni Ki" />
                        <AvatarFallback>VK</AvatarFallback>
                    </Avatar>
                    <div>
                        <h1 className="text-xl font-medium"><Trans>Let's create your venue! <span aria-hidden="true">❤️</span></Trans></h1>
                        <p className="text-sm text-muted-foreground"><Trans>Fill this in and I'll get your venue listed</Trans></p>
                    </div>
                </div>
                <VenueForm submitLabel={<Trans>Create venue</Trans>} onSubmit={create} />
            </div>
        </DefaultPageLayout.Page>
    </DefaultPageLayout>;
};