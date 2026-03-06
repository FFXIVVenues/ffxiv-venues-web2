import {DefaultPageLayout} from "@/layouts/defaultPageLayout.tsx";
import {FilterMenu} from "@/components/filterMenu/filterMenu.tsx";
import {useVenueSchedule} from "@/lib/services/venues/useVenueSchedule.ts";
import {VenueCarousel} from "@/components/venueCarousel/venueCarousel.tsx";
import {Day} from "@/lib/model/day.ts";
import {Skeleton} from "@/components/ui/skeleton.tsx";
import {Spinner} from "@/components/ui/spinner.tsx";

export const VenueDirectoryPage = () => {
    const [venues, error, setFilters] = useVenueSchedule([]);
    const currentDay = new Date().getDay() - 1 % 7

    return(
        <DefaultPageLayout>
            <DefaultPageLayout.Panel>
                <FilterMenu onFilter={setFilters} />
            </DefaultPageLayout.Panel>
            <DefaultPageLayout.Page>
            {error ? (
                <div className="mx-auto max-w-7xl py-6">
                    <p className="text-red-600">Error: {error?.message}</p>
                </div>
            ): !venues ? (
                <>
                    <div className="flex items-center justify-center gap-3 py-6 text-muted-foreground">
                        <Spinner className="size-5" />
                        <span>Getting venues...</span>
                    </div>
                    <div className="mx-auto max-w-7xl py-6 space-y-10">
                        {Array.from({ length: 4 }).map((_, i) => (
                            <section key={i} className="space-y-3">
                                <Skeleton className="h-7 w-48" />
                                <Skeleton className="h-64 w-full rounded-xl" />
                            </section>
                        ))}
                    </div>
                </>
            ): (
                <>
                    <VenueCarousel title="Open Now" venues={venues?.open ?? []} />
                    <VenueCarousel title="Newest" venues={venues?.newest ?? []} />
                    {(venues?.scheduled ?? []).map((dayVenues, i) => {
                        const day = Day[(currentDay+i)%7];
                        const title = i === 0 ? `Today (${day})` : i === 1 ? `Tomorrow (${day})` : day;

                        return(
                            <VenueCarousel key={day} title={title} venues={dayVenues} />
                        )
                    })}
                    <VenueCarousel title="Future Openings" venues={venues?.future ?? []} />
                    <VenueCarousel title="Unscheduled" venues={venues?.unscheduled ?? []} />
                </>
                )
            }
            </DefaultPageLayout.Page>
        </DefaultPageLayout>
    );
}