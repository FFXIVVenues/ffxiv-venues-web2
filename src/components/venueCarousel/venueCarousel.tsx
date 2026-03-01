import React, { type ReactNode } from "react";
import type { Venue } from "@/lib/model/venue";
import { VenueCard } from "@/components/venueCard/venueCard";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Collapsible, CollapsibleContent, CollapsibleTrigger} from "@/components/ui/collapsible.tsx";
import {ChevronRightIcon} from "lucide-react";

type VenueCarouselSectionProps = {
    title: ReactNode;
    venues: Venue[];
};

export function VenueCarousel({ title, venues }: VenueCarouselSectionProps) {
    if (!venues || venues.length === 0) return null;
    const [open, setOpen] = React.useState(true)

    return (
        <Collapsible open={open} onOpenChange={setOpen}>
            <section className="w-full min-w-0">
                <CollapsibleTrigger className="group flex w-full items-center gap-5 transition-colors duration-200 hover:text-[rgb(227,120,255)] hover:drop-shadow-[0_0_6px_rgba(227,120,255,0.6)]">
                    <ChevronRightIcon className={["h-4 w-4 transition-transform duration-200 group-hover:text-[rgb(227,120,255)] ", open ? "rotate-90" : "rotate-0",].join(" ")} />
                    <h2 className="text-lg font-semibold tracking-wide uppercase text-foreground/90 transition-colors duration-200 group-hover:text-[rgb(227,120,255)]">{title}</h2>
                </CollapsibleTrigger>

                <CollapsibleContent>
                    <Carousel opts={{ align: "start", loop: false, dragFree: true }} className="w-full mt-3">
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
                </CollapsibleContent>

            </section>
        </Collapsible>
    );
}