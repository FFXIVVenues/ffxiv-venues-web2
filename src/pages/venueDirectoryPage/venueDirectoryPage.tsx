import {DefaultPageLayout} from "@/layouts/defaultPageLayout.tsx";
import {VenueCard, VenueStatus} from "@/components/venueCard/venueCard.tsx";
const venues = [
    {
        id: "1",
        name: "The Cozy Leaf",
        imageUrl: "https://placehold.co/800x350",
        timeText: "Today 7:00pm - 11:00pm",
        status: VenueStatus.Open
    },
    {
        id: "2",
        name: "Liquid Hero Pub",
        imageUrl: "https://placehold.co/800x350",
        timeText: "Saturday 12:00am - 4:00am",
        status: VenueStatus.New
    },
    {
        id: "3",
        name: "Moonlight Lounge",
        imageUrl: "https://placehold.co/800x350",
        timeText: "Sunday 8:00pm - 1:00am",
        status: VenueStatus.None
    },
];

export const VenueDirectoryPage = () => {
    return <DefaultPageLayout>
        <DefaultPageLayout.Panel>
            Cock!
        </DefaultPageLayout.Panel>
        <DefaultPageLayout.Page>
            <div className="mx-auto w-full max-w-7xl py-6">
                <div className="grid gap-6 grid-cols-3">
                {venues.map(venue => (
                    <VenueCard venue={venue} />
                ))}
                </div>
            </div>
        </DefaultPageLayout.Page>
    </DefaultPageLayout>;
}