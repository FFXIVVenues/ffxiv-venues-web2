import {useCallback, useEffect, useState} from "react";
import {useParams, useNavigate, useLocation} from "react-router";
import {DefaultPageLayout} from "@/layouts/defaultPageLayout.tsx";
import {FilterMenu} from "@/components/filterMenu/filterMenu.tsx";
import {useVenueSchedule} from "@/lib/services/venues/useVenueSchedule.ts";
import {VenueCarousel} from "@/components/venueCarousel/venueCarousel.tsx";
import {Day} from "@/lib/model/day.ts";
import {Skeleton} from "@/components/ui/skeleton.tsx";
import type {Venue} from "@/lib/model/venue.ts";
import {VenueDrawer} from "@/components/venueDrawer/venueDrawer.tsx";
import {VenueList} from "@/components/venueList/venueList.tsx";
import {useSetting} from "@/lib/services/settings/useSetting";
import {venueService} from "@/lib/services/venues/venueService.ts";
import type {VenueSchedule} from "@/lib/services/venues/venueSchedule.ts";

export const VenueDirectoryPage = () => {
    const { venue, openDrawer } = useVenueFromRoute();
    const navigate = useNavigate();
    useVenueHashRedirect();

    const [venues, error, setFilters] = useVenueSchedule([]);
    const view = useSetting('view');

    const title = openDrawer && venue ? `${venue.name} - FFXIV Venues` : undefined;
    const openVenue = useCallback((venue: Venue, newTab?: boolean) => {
        if (newTab) {
            window.open(`/venue/${venue.id}`, '_blank');
        } else {
            navigate(`/venue/${venue.id}`);
        }
    }, [navigate]);

    const closeVenue = useCallback(() => {
        navigate('/');
    }, [navigate]);

    return(
        <DefaultPageLayout title={title}>
            <DefaultPageLayout.Panel>
                <FilterMenu onFilter={setFilters} />
            </DefaultPageLayout.Panel>
            <DefaultPageLayout.Page>
                <VenueDrawer open={openDrawer} venue={venue} onClose={closeVenue} />
                {error ? (
                    <div className="mx-auto max-w-7xl py-6">
                        <p className="text-red-600">Error: {error?.message}</p>
                    </div>
                ): !venues
                  ? <VenueDirectoryLoadingStub />
                  : view === 'list'
                    ? <VenueDirectoryAsList venues={venues} onVenueClick={openVenue} />
                    : <VenueDirectoryAsCards venues={venues} onVenueClick={openVenue} />
                }
            </DefaultPageLayout.Page>
        </DefaultPageLayout>
    );
}

function VenueDirectoryLoadingStub() {
    return <>
        <div className="mx-12 max-w-7xl py-2 space-y-10">
            {Array.from({ length: 4 }).map((_, i) => (
              <section key={i} className="space-y-3">
                  <Skeleton className="h-7 w-48" />
                  <div className="flex flex-row space-x-4 overflow-hidden">
                      <Skeleton className="w-93.75 aspect-square rounded-xl" />
                      <Skeleton className="w-93.75 aspect-square rounded-xl" />
                      <Skeleton className="w-93.75 aspect-square rounded-xl" />

                  </div>
              </section>
            ))}
        </div>
    </>
}

function VenueDirectoryAsList({ venues, onVenueClick }  : { venues: VenueSchedule, onVenueClick: (venue: Venue) => void }) {
    const currentDay = (new Date().getDay() + 6) % 7;
    return <div className="mt-4">
        <VenueList title="Favorites" venues={venues.favourites} onVenueClick={onVenueClick} />
        <VenueList title="Open Now" venues={venues.open} onVenueClick={onVenueClick} />
        <VenueList title="Newest" venues={venues.newest} onVenueClick={onVenueClick} />
        {(venues?.scheduled).map((dayVenues, i) => {
            const day = Day[(currentDay+i)%7];
            const title = i === 0 ? `Today (${day})` : i === 1 ? `Tomorrow (${day})` : day;
            return(
              <VenueList key={day} title={title} venues={dayVenues} onVenueClick={onVenueClick} />
            )}
        )}
        <VenueList title="Future Openings" venues={venues.future} onVenueClick={onVenueClick} future={true}/>
        <VenueList title="Unscheduled" venues={venues.unscheduled} onVenueClick={onVenueClick} />
    </div>
}

function VenueDirectoryAsCards({ venues, onVenueClick } : { venues: VenueSchedule, onVenueClick: (venue: Venue) => void }) {
    const currentDay = (new Date().getDay() + 6) % 7;
    return <div className="mt-4">
        <VenueCarousel title="Favorites" venues={venues.favourites} onVenueClick={onVenueClick} className="mb-4" />
        <VenueCarousel title="Open Now" venues={venues.open} onVenueClick={onVenueClick} className="mb-4" />
        <VenueCarousel title="Newest" venues={venues.newest} onVenueClick={onVenueClick} className="mb-4" />
        {(venues.scheduled).map((dayVenues, i) => {
            const day = Day[(currentDay+i)%7];
            const title = i === 0 ? `Today (${day})` : i === 1 ? `Tomorrow (${day})` : day;
            return(
              <VenueCarousel key={day} title={title} venues={dayVenues} onVenueClick={onVenueClick} className="mb-4" />
            )
        })}
        <VenueCarousel title="Future Openings" venues={venues.future} onVenueClick={onVenueClick} className="mb-4" />
        <VenueCarousel title="Unscheduled" venues={venues.unscheduled} onVenueClick={onVenueClick} className="mb-4" />
    </div>;
}

function useVenueFromRoute() {
    const { venueId } = useParams();
    const [venue, setVenue] = useState<Venue | null>(null);
    const [openDrawer, setOpenDrawer] = useState(false);

    useEffect(() => {
        if (venueId == null){
            setOpenDrawer(false);
        }
        else{
            venueService.getVenueById(venueId).then(v => {
                setVenue(v ?? null);
                setOpenDrawer(v != null);
            });
        }
    }, [venueId]);

    return { venue, openDrawer };
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