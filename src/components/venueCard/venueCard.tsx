import { Card, CardContent, CardHeader } from "@/components/ui/card";
export enum VenueStatus {
    None = "none",
    Open = "open",
    New  = "new"
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
    return(
        <Card className="overflow-hidden">
            <img src={venue.imageUrl} alt={venue.name} loading="lazy" className="w-full rounded-md object-cover" />
            <CardHeader className="text-right mb-0">
                <div className="text-lg font-semibold leading-tight">{venue.name}</div>
            </CardHeader>
            <CardContent className="mt-0">
                <div className="text-right">
                    <div className="text-sm text-muted-foreground">{venue.timeText}</div>
                </div>
            </CardContent>
        </Card>
    );
}