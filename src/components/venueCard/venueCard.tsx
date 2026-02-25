import {Card, CardHeader, CardFooter, CardTitle, CardAction, CardDescription} from "@/components/ui/card";
import {Badge} from "@/components/ui/badge.tsx";
import {Button} from "@/components/ui/button.tsx";

export enum VenueStatus {
    None = "Closed",
    Open = "Open",
    New  = "New"
}
type Venue = {
    id: string;
    name: string;
    imageUrl: string;
    timeText: string;
    status?: VenueStatus;
}

type VenueCardProps = {
    venue: Venue;
}

export function VenueCard({ venue }: VenueCardProps) {
    const isOpen = venue.status === VenueStatus.Open;
    const isNew  = venue.status === VenueStatus.New;
    const pingOuter = isOpen ? "bg-fuchsia-500" : isNew ? "bg-green-500" : "";
    const pingInner = isOpen ? "bg-fuchsia-400 shadow-[0_0_10px_rgba(232,121,249,0.75)]" : isNew ? "bg-green-400 shadow-[0_0_10px_rgba(34,197,94,0.75)]" : "";

    return (
        <Card className="group rounded-xl overflow-visible pt-0 transition hover:-translate-y-0.5 hover:shadow-xl">
            <div className="relative w-full aspect-2/1 overflow-hidden rounded-t-xl">
                <img
                    src={venue.imageUrl}
                    alt={venue.name}
                    loading="lazy"
                    className="h-full w-full object-cover"
                />
            </div>

            <CardHeader className="">
                {(isOpen || isNew) && (
                    <CardAction>
                        <Badge variant="secondary" className="relative pr-6">
                            {venue.status}
                            <span className="absolute right-2 top-1/2 -translate-y-1/2 flex h-2.5 w-2.5">
                            <span className={`absolute inline-flex h-full w-full animate-ping rounded-full ${pingOuter} opacity-75`} />
                            <span className={`relative inline-flex h-2.5 w-2.5 rounded-full ${pingInner}`} />
                        </span>
                        </Badge>
                    </CardAction>
                )}
                <CardTitle className="text-xl">{venue.name}</CardTitle>
                <CardDescription className="text-base">
                    {venue.timeText}
                </CardDescription>
            </CardHeader>

            <CardFooter className="flex flex-col gap-3">
                <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="text-xs bg-muted text-muted-foreground border-muted py-0.5">Tag 1</Badge>
                    <Badge variant="outline" className="text-xs bg-muted text-muted-foreground border-muted py-0.5">Tag 2</Badge>
                    <Badge variant="outline" className="text-xs bg-muted text-muted-foreground border-muted py-0.5">Tag 3</Badge>
                    <Badge variant="outline" className="text-xs bg-muted text-muted-foreground border-muted py-0.5">Tag 4</Badge>
                    <Badge variant="outline" className="text-xs bg-muted text-muted-foreground border-muted py-0.5">Tag 5</Badge>
                    <Badge variant="outline" className="text-xs bg-muted text-muted-foreground border-muted py-0.5">Tag 6</Badge>
                </div>
                <Button className="w-full">View Venue</Button>
            </CardFooter>
        </Card>
    );
}