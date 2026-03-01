import {DefaultPageLayout} from "@/layouts/defaultPageLayout.tsx";
import {FilterMenu} from "@/components/filterMenu/filterMenu.tsx";
import {useVenueSchedule} from "@/lib/services/venues/useVenueSchedule.ts";
import {VenueCarousel} from "@/components/venueCarousel/venueCarousel.tsx";
import {getDay} from "@/components/dateString/dayText.tsx";

export const VenueDirectoryPage = () => {
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
                <VenueCarousel title="Open Now" venues={(venues?.open ?? []).map(x => x.venue)} />
                <VenueCarousel title="Newest" venues={(venues?.newest ?? []).map(x => x.venue)} />
                {(venues?.scheduled ?? []).map((dayItems, i) =>
                    dayItems.length ? (
                        <VenueCarousel key={i} title={getDay(i)} items={dayItems}/>
                    ) : null
                )}
                <VenueCarousel title="Future Openings" venues={(venues?.future ?? []).map(x => x.venue)} />
                <VenueCarousel title="Unscheduled" venues={(venues?.unscheduled ?? []).map(x => x.venue)} />
            </DefaultPageLayout.Page>
    </DefaultPageLayout>
    );
}