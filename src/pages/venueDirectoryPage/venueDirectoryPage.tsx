import {DefaultPageLayout} from "@/layouts/defaultPageLayout.tsx";
import {VenueCard, VenueStatus} from "@/components/venueCard/venueCard.tsx";
const venues = [
    {
        id: "1",
        name: "Really super long title that's annoying",
        imageUrl: "../../assets/Venue1.webp",
        timeText: "Today 7:00pm - 11:00pm",
        status: VenueStatus.Open,
        tags: ["Lounge", "Other", "Photography", "LGBTQIA+", "RP Heavy", "SuperDuperReallyLongAnnoyingTag"]
    },
    {
        id: "2",
        name: "Liquid Hero Pub",
        imageUrl: "../../assets/Venue2.webp",
        timeText: "Saturday 12:00am - 4:00am",
        status: VenueStatus.New,
        tags: ["Tavern", "Lounge", "Bar", "RP Heavy"]
    },
    {
        id: "3",
        name: "Moonlight Lounge",
        imageUrl: "../../assets/Venue3.webp",
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