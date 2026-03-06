import {DefaultPageLayout} from "@/layouts/defaultPageLayout.tsx";
import {FilterMenu} from "@/components/filterMenu/filterMenu.tsx";
import {VenueCard} from "@/components/venueCard/venueCard.tsx";
import {useVenueSchedule} from "@/lib/services/venues/useVenueSchedule.ts";
import {useState} from "react";
import type {Venue} from "@/lib/model/venue.ts";
import {VenueDrawer} from "@/components/venueSheet/venueDrawer.tsx";

export const VenueDirectoryPage = () => {
    const [selectedVenue, setSelectedVenue] = useState<Venue | null>(null);
    const [venues, error, setFilters] = useVenueSchedule([]);

    if (error) {
        return(
            <DefaultPageLayout>
                <DefaultPageLayout.Panel>
                    <FilterMenu onFilter={setFilters} />
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
                <FilterMenu onFilter={setFilters} />
            </DefaultPageLayout.Panel>
            <DefaultPageLayout.Page>
                { selectedVenue && (<VenueDrawer venue={selectedVenue} onClose={() => setSelectedVenue(null)} />)}
                <div className="mx-auto w-full max-w-7xl py-6">
                    <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                        {(venues?.open ?? []).map((venue) => (
                            <VenueCard key={venue.venue.id} venue={venue.venue} onClick={() => setSelectedVenue(venue.venue)} />
                        ))}
                    </div>
                </div>
            </DefaultPageLayout.Page>
        </DefaultPageLayout>
    );
}