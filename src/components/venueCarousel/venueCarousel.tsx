import type { ReactNode } from "react";
import type { Venue } from "@/lib/model/venue";
import { VenueCard } from "@/components/venueCard/venueCard";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";

type VenueCarouselSectionProps = {
    title: ReactNode;
    venues: Venue[];
};

export function VenueCarousel({ title, venues }: VenueCarouselSectionProps) {
    if (!venues || venues.length === 0) return null;

    return (
        <section className="space-y-3 w-full min-w-0">
            <h2 className="text-lg font-semibold tracking-wide uppercase text-foreground/90">
                {title}
            </h2>

            <Carousel opts={{ align: "start", loop: false, dragFree: true }} className="w-full">
                <div className="grid grid-cols-[30px_1fr_30px] items-center gap-2 w-full min-w-0">
                    <div className="flex justify-center">
                        <CarouselPrevious className="relative h-8 w-8 ml-24" />
                    </div>

                    <div className="relative min-w-0 overflow-hidden">
                        <CarouselContent className="gap-4">
                            {venues.map((v) => (
                                <CarouselItem
                                    key={v.id}
                                    className="grow-0 shrink-0 basis-75 sm:basis-95 lg:basis-100"
                                >
                                    <VenueCard venue={v} />
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                    </div>

                    <div className="flex justify-center">
                        <CarouselNext className="relative h-8 w-8 mr-24" />
                    </div>
                </div>
            </Carousel>
        </section>
    );
}