import {DefaultPageLayout} from "@/layouts/defaultPageLayout.tsx";
import {VenueCard} from "@/components/venueCard/venueCard.tsx";
import {useVenueSchedule} from "@/lib/services/venues/useVenueSchedule.ts";

export const VenueDirectoryPage = () => {
    const [venues, error, setFilters] = useVenueSchedule([]);

    console.log(venues);
    console.log(error)
    if (error) { return(
            <DefaultPageLayout>
                <DefaultPageLayout.Panel>
                    Cock!
                </DefaultPageLayout.Panel>
                <DefaultPageLayout.Page>
                    <div className="mx-auto w-full max-w-7xl py-6">
                        <p className="text-red-600">Error: {error?.message}</p>
                    </div>
                </DefaultPageLayout.Page>
            </DefaultPageLayout>
        );
    }
    return (
        <DefaultPageLayout>
            <DefaultPageLayout.Panel>
                Cock!
            </DefaultPageLayout.Panel>
            <DefaultPageLayout.Page>
                <div className="mx-auto w-full max-w-7xl py-6">
                    <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                        {(venues?.open ?? []).map((venue) => (
                            <VenueCard key={venue.venue.id} venue={venue.venue} />
                        ))}
                    </div>
                </div>
            </DefaultPageLayout.Page>
    </DefaultPageLayout>
    );
}