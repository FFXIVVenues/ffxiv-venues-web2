import {Card, CardHeader, CardFooter, CardTitle, CardAction, CardDescription, CardContent} from "@/components/ui/card";
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
    tags?: string[];
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
        <Card className="rounded-xl overflow-hidden py-0">
            <div className="relative w-full aspect-2/1 overflow-hidden rounded-t-xl">
                <img
                    src={venue.imageUrl}
                    alt={venue.name}
                    loading="lazy"
                    className="h-full w-full object-cover"
                />
            </div>

            <CardHeader className="">
                <div className="flex items-start justify-between gap-3">
                    <CardTitle className="text-xl leading-tight">{venue.name}</CardTitle>
                    {(isOpen || isNew) && (
                        <Badge variant="secondary" className="relative pr-6 shrink-0 mt-0.5">
                            {venue.status}
                            <span className="absolute right-2 top-1/2 -translate-y-1/2 flex h-2.5 w-2.5">
                                <span className={`absolute inline-flex h-full w-full animate-ping rounded-full ${pingOuter} opacity-75`} />
                                <span className={`relative inline-flex h-2.5 w-2.5 rounded-full ${pingInner}`} />
                            </span>
                        </Badge>
                    )}
                </div>
                <CardDescription className="text-base">
                    {venue.timeText}
                </CardDescription>
            </CardHeader>

            <CardContent>
                {venue.tags && venue.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 pt-0.5">
                        {venue.tags.slice(0,3).map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs bg-muted text-muted-foreground border-muted py-0.5 whitespace-nowrap rounded-sm
                                transition duration-200 ease-out hover:-translate-y-0.5
                                hover:scale-[1.06] hover:bg-accent hover:text-accent-foreground hover:border-accent hover:shadow-sm">
                                {tag}
                            </Badge>
                        ))}

                        {venue.tags.length > 3 && (
                            <Badge variant="outline" className="text-xs bg-muted text-muted-foreground border-muted py-0.5 whitespace-nowrap rounded-sm
                            transition duration-200 ease-out hover:-translate-y-0.5
                             hover:scale-[1.06] hover:bg-accent hover:text-accent-foreground hover:border-accent hover:shadow-sm">+{venue.tags.length - 3} more</Badge>
                        )}
                    </div>
                )}
            </CardContent>

            <CardFooter className="py-4 border-t">
                <Button className="w-full">View Venue</Button>
            </CardFooter>
        </Card>
    );
}