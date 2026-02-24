import { Card, CardContent } from "@/components/ui/card";
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
            <CardContent className="p-3">
                <div className="text-base font-semibold">{venue.name}</div>
                <div className="text-sm text-muted-foreground">{venue.timeText}</div>
            </CardContent>
        </Card>
    );
}