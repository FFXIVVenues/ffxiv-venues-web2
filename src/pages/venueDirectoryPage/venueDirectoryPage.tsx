import {useState, useCallback, useEffect} from "react";
import {useParams, useNavigate, useLocation} from "react-router";
import {DefaultPageLayout} from "@/layouts/defaultPageLayout.tsx";
import {FilterMenu} from "@/components/filterMenu/filterMenu.tsx";
import {useVenueSchedule} from "@/lib/services/venues/useVenueSchedule.ts";
import {VenueCarousel} from "@/components/venueCarousel/venueCarousel.tsx";
import {Day} from "@/lib/model/day.ts";
import {Skeleton} from "@/components/ui/skeleton.tsx";
import {Spinner} from "@/components/ui/spinner.tsx";
import type {Venue} from "@/lib/model/venue.ts";
import {VenueDrawer} from "@/components/venueDrawer/venueDrawer.tsx";
import {VenueList} from "@/components/venueList/venueList.tsx";
import {useSetting} from "@/lib/services/settings/useSetting";
import type {ScheduleItem} from "@/lib/services/venues/venueService.ts";
import {venueService} from "@/lib/services/venues/venueService.ts";

const EMPTY_ARRAY: ScheduleItem[] = [];

export const VenueDirectoryPage = () => {
    const [showVenuePanel, setShowVenuePanel] = useState<boolean>(false);
    const [selectedVenue, setSelectedVenue] = useState<Venue | null>(null);
    const [venues, error, setFilters] = useVenueSchedule([]);
    const currentDay = (new Date().getDay() + 6) % 7
    const view = useSetting('view');

    const activateVenuePanel = useCallback((venue: Venue) => {
        setShowVenuePanel(true); setSelectedVenue(venue);
    }, []);

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
                    ):
                    <>
                        <VenueDrawer open={showVenuePanel} venue={selectedVenue} onClose={() => setShowVenuePanel(false)} />
                        {view === 'list' ? (
                            <>
                                <VenueList title="Favorites" venues={venues.favourites} onVenueClick={activateVenuePanel} className="mb-4" />
                                <VenueList title="Open Now" venues={venues.open} onVenueClick={activateVenuePanel} />
                                <VenueList title="Newest" venues={venues.newest} onVenueClick={activateVenuePanel} />
                                {(venues?.scheduled).map((dayVenues, i) => {
                                    const day = Day[(currentDay+i)%7];
                                    const title = i === 0 ? `Today (${day})` : i === 1 ? `Tomorrow (${day})` : day;

                                    return(
                                        <VenueList key={day} title={title} venues={dayVenues} onVenueClick={activateVenuePanel} />
                                    )}
                                )}
                                <VenueList title="Future Openings" venues={venues.future} onVenueClick={activateVenuePanel} future={true}/>
                                <VenueList title="Unscheduled" venues={venues.unscheduled} onVenueClick={activateVenuePanel} />
                            </>
                        ) : (
                            <>
                                <VenueCarousel title="Favorites" venues={venues.favourites} onVenueClick={activateVenuePanel} className="mb-4" />
                                <VenueCarousel title="Open Now" venues={venues.open} onVenueClick={activateVenuePanel} />
                                <VenueCarousel title="Newest" venues={venues.newest} onVenueClick={activateVenuePanel} />
                                {(venues.scheduled).map((dayVenues, i) => {
                                    const day = Day[(currentDay+i)%7];
                                    const title = i === 0 ? `Today (${day})` : i === 1 ? `Tomorrow (${day})` : day;

                                    return(
                                        <VenueCarousel key={day} title={title} venues={dayVenues} onVenueClick={activateVenuePanel} />
                                    )
                                })}
                                <VenueCarousel title="Future Openings" venues={venues.future} onVenueClick={activateVenuePanel} />
                                <VenueCarousel title="Unscheduled" venues={venues.unscheduled} onVenueClick={activateVenuePanel} />
                            </>
                        )}
                    </>
                }
            </DefaultPageLayout.Page>
        </DefaultPageLayout>
    );
}

function useVenueFromRoute() {
    const { venueId } = useParams();
    const [venue, setVenue] = useState<Venue | null>(null);
    useEffect(() => {
        if (venueId == null) {
            setVenue(null);
            return;
        }
        venueService.getVenueById(venueId).then(v => setVenue(v ?? null));
    }, [venueId]);
    return venue;
}

function useVenueHashRedirect() {
    const { venueId } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    useEffect(() => {
        const requestedVenueId = location.hash.substring(1);
        if (requestedVenueId && requestedVenueId !== venueId)
            navigate(`/venue/${requestedVenueId}`);
    }, []);
}