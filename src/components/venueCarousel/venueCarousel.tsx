import React, { type ReactNode } from "react";
import { VenueCard } from "@/components/venueCard/venueCard";
import type { ScheduleItem } from "@/lib/services/venues/venueService";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Collapsible, CollapsibleContent, CollapsibleTrigger} from "@/components/ui/collapsible.tsx";
import {ChevronRightIcon} from "lucide-react";
import {cn} from "@/lib/utils";
import {VenueCardCompact} from "@/components/venueCard/venueCardCompact.tsx";
import type {Venue} from "@/lib/model/venue.ts";

type VenueCarouselProps = {
    title: ReactNode;
    venues?: ScheduleItem[];
    onVenueClick: (venue: Venue) => void;
};

export function VenueCarousel({ title, venues, onVenueClick}: VenueCarouselProps) {
    const list = venues ?? [];
    if (list.length === 0) return null;
    const [open, setOpen] = React.useState(true)

    return (
        <Collapsible open={open} onOpenChange={setOpen}>
                <CollapsibleTrigger className="ml-12 group flex w-full items-center gap-2 hover:text-accent">
                    <ChevronRightIcon className={cn("h-4 w-4 transition-transform", open ? "rotate-90" : "rotate-0")} />
                    <h2 className="text-lg font-semibold tracking-wide uppercase text-foreground/90 group-hover:text-accent">{title}</h2>
                </CollapsibleTrigger>

                <CollapsibleContent>
                    <div className="relative px-12">
                        <Carousel opts={{ align: "start", loop: false, dragFree: true }} className="mt-3 pb-3">
                            <CarouselContent>
                                {venues!.map(({ venue, opening }) => (
                                    <CarouselItem key={`${venue.id}-${opening?.start ?? "x"}--${title}`} className="basis-65 sm:basis-70 md:basis-90 lg:basis-auto">
                                        <VenueCard venue={venue} opening={opening} onClick={() => onVenueClick(venue)}/>
                                    </CarouselItem>
                                ))}
                            </CarouselContent>

                            <CarouselPrevious />
                            <CarouselNext />
                        </Carousel>
                    </div>
                </CollapsibleContent>
        </Collapsible>
    );
}