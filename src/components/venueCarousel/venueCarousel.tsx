import React, {memo, type ReactNode} from "react";
import {VenueCardFull} from "@/components/venueCard/venueCardFull.tsx";
import {VenueCardCompact} from "@/components/venueCard/venueCardCompact.tsx";
import type {ScheduleItem} from "@/lib/services/venues/venueService";
import {Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious} from "@/components/ui/shadcn/carousel.tsx";
import {Collapsible, CollapsibleContent, CollapsibleTrigger} from "@/components/ui/shadcn/collapsible.tsx";
import {ChevronRightIcon} from "lucide-react";
import {cn} from "@/lib/utils";
import {useSetting} from "@/lib/services/settings/useSetting";
import type {Venue} from "@/lib/model/venue.ts";
import type {Opening} from "@/lib/model/opening.ts";

type VenueCarouselProps = {
    title: ReactNode;
    venues?: ScheduleItem[];
    onVenueClick: (venue: Venue, newTab?: boolean) => void;
    className?: string;
};

export const VenueCarousel = memo(({ title, venues, onVenueClick, className }: VenueCarouselProps) => {
    const list = venues ?? [];
    if (list.length === 0) return null;
    const [open, setOpen] = React.useState(true)

    return (
        <Collapsible open={open} onOpenChange={setOpen} className={className}>
            <CollapsibleTrigger className="ml-12 flex w-full items-center gap-2  cursor-pointer" >
                <ChevronRightIcon className={cn("h-4 w-4 transition-transform", open ? "rotate-90" : "rotate-0")} />
                <h2 className="text-lg font-semibold tracking-wide uppercase text-foreground/90 ">{title}</h2>
            </CollapsibleTrigger>

            <CollapsibleContent>
                <div className="relative px-12">
                    <Carousel opts={{ containScroll: "trimSnaps", align: "start", loop: false, dragFree: true }} className="mt-3 pb-3">
                        <CarouselContent className="">
                            {venues!.map(({ venue, opening }) => (
                                <CarouselItem key={`${venue.id}-${opening?.start ?? "x"}--${title}`} className="basis-auto my-px box-border w-[275px] lg:w-min">
                                  <VenueCard venue={venue} opening={opening} onClick={onVenueClick} className="max-lg:w-full" />
                                </CarouselItem>
                            ))}
                        </CarouselContent>

                        <CarouselPrevious aria-label="Previous" />
                        <CarouselNext aria-label="Next" />
                    </Carousel>
                </div>
            </CollapsibleContent>
        </Collapsible>
    );
});

type VenueCardProps = { venue: Venue, opening?: Opening, onClick: (venue: Venue, newTab?: boolean) => void, className?: string }

const VenueCard = memo(({ venue, opening, onClick, className }: VenueCardProps) => {
  const view = useSetting('view');
  return view === 'compact'
          ? <VenueCardCompact venue={venue} opening={opening} onClick={onClick} className={className}/>
          : <VenueCardFull venue={venue} opening={opening} onClick={onClick} className={className}/>
})
