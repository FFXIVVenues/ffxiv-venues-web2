import {DefaultPageLayout} from "@/layouts/defaultPageLayout.tsx";
import {FilterMenu} from "@/components/filterMenu/filterMenu.tsx";
import {useVenueSchedule} from "@/lib/services/venues/useVenueSchedule.ts";
import {VenueCarousel} from "@/components/venueCarousel/venueCarousel.tsx";
import {Day} from "@/lib/model/day.ts";

export const VenueDirectoryPage = () => {
    const [venues, error, setFilters] = useVenueSchedule([]);
    const currentDay = new Date().getDay() - 1 % 7

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
                <VenueCarousel title="Open Now" venues={venues?.open ?? []} />
                <VenueCarousel title="Newest" venues={venues?.newest ?? []} />
                {(venues?.scheduled ?? []).map((dayVenues, i) => {
                    const day = Day[(currentDay+i)%7];
                    const title = i === 0 ? `Today (${day})` : i === 1 ? `Tomorrow (${day})` : day;

                    return(
                        <VenueCarousel title={title} venues={dayVenues} />
                    )
                })}
                <VenueCarousel title="Future Openings" venues={venues?.future ?? []} />
                <VenueCarousel title="Unscheduled" venues={venues?.unscheduled ?? []} />
            </DefaultPageLayout.Page>
    </DefaultPageLayout>
    );
}