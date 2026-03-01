import {DefaultPageLayout} from "@/layouts/defaultPageLayout.tsx";
import {FilterMenu} from "@/components/filterMenu/filterMenu.tsx";
import {useVenueSchedule} from "@/lib/services/venues/useVenueSchedule.ts";
import {VenueCarousel} from "@/components/venueCarousel/venueCarousel.tsx";

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
                {(venues?.scheduled ?? []).map((dayItems, i) => {
                    if (!dayItems || dayItems.length === 0) return null;

                    return (
                        <VenueCarousel
                            key={i}
                            title={getDay(i)}
                            venues={dayItems.map(x => x.venue)}
                        />
                    );
                })}
                <VenueCarousel title="Future Openings" venues={(venues?.future ?? []).map(x => x.venue)} />
                <VenueCarousel title="Unscheduled" venues={(venues?.unscheduled ?? []).map(x => x.venue)} />
            </DefaultPageLayout.Page>
    </DefaultPageLayout>
    );
}

const DAY_NAMES = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"] as const;

function getDay(relativeIndex: number, now = new Date()) {
    const dayIndex = (now.getDay() + relativeIndex) % 7;
    const dayName = DAY_NAMES[dayIndex];

    if (relativeIndex === 0) return `Today (${dayName})`;
    if (relativeIndex === 1) return `Tomorrow (${dayName})`;
    return dayName;
}