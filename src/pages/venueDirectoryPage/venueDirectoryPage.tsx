import {DefaultPageLayout} from "@/layouts/defaultPageLayout.tsx";
import {VenueCard, VenueStatus} from "@/components/venueCard/venueCard.tsx";
const venues = [
    {
        id: "1",
        name: "The Cozy Leaf",
        imageUrl: "../../assets/default-banner.jpg",
        timeText: "Today 7:00pm - 11:00pm",
        status: VenueStatus.Open,
        tags: ["Lounge", "Other", "Photography", "LGBTQIA+", "RP Heavy"]
    },
    {
        id: "2",
        name: "Liquid Hero Pub",
        imageUrl: "../../assets/default-banner.jpg",
        timeText: "Saturday 12:00am - 4:00am",
        status: VenueStatus.New,
        tags: ["Tavern", "Lounge", "Bar", "RP Heavy"]
    },
    {
        id: "3",
        name: "Moonlight Lounge",
        imageUrl: "../../assets/default-banner.jpg",
        timeText: "Sunday 8:00pm - 1:00am",
        status: VenueStatus.None,
        tags: ["Lounge", "Gambling", "Drink", "Twitch DJ"]
    },
];

export const VenueDirectoryPage = () => {
    return <DefaultPageLayout>
        <DefaultPageLayout.Panel>
            Cock!
        </DefaultPageLayout.Panel>
        <DefaultPageLayout.Page>
            <div className="mx-auto w-full max-w-7xl py-6">
                <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {venues.map(venue => (
                    <VenueCard key={venue.id} venue={venue} />
                ))}
                </div>
            </div>
        </DefaultPageLayout.Page>
    </DefaultPageLayout>;
}