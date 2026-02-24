import {DefaultPageLayout} from "@/layouts/defaultPageLayout.tsx";
import { VenueCard } from "@/components/venueCard/venueCard.tsx";
const venues = [
    {
        id: "1",
        name: "The Cozy Leaf",
        imageUrl: "https://placehold.co/800x350",
        timeText: "Today 7:00pm - 11:00pm",
        isOpenNow: true,
        isNew: false,
    },
    {
        id: "2",
        name: "Liquid Hero Pub",
        imageUrl: "https://placehold.co/800x350",
        timeText: "Saturday 12:00am - 4:00am",
        isOpenNow: false,
        isNew: true,
    },
    {
        id: "3",
        name: "Moonlight Lounge",
        imageUrl: "https://placehold.co/800x350",
        timeText: "Sunday 8:00pm - 1:00am",
        isOpenNow: false,
        isNew: false,
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