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
    const isOpen = venue.status === VenueStatus.Open;
    return (
        <Card className="rounded-xl overflow- pt-0">
            <div className="relative">
                <img
                    src={venue.imageUrl}
                    alt={venue.name}
                    loading="lazy"
                    className="block w-full object-cover"
                />

                {isOpen && (
                    <div className="absolute inset-0 rounded-t-xl shadow-[inset_0_0_0_3px_rgba(232,121,249,1),_0_0_20px_rgba(232,121,249,0.6)]" />
                )}

                {isOpen && (
                    <span className="absolute left-3 top-3 flex h-3 w-3">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-fuchsia-500 opacity-75" />
                        <span className="relative inline-flex h-3 w-3 rounded-full bg-fuchsia-400" />
                    </span>
                )}
            </div>

            <CardHeader className="pb-1 text-right">
                <div className="text-xl font-semibold leading-tight">{venue.name}</div>
            </CardHeader>

            <CardContent className="pt-0 text-right">
                <div className="text-base text-muted-foreground">{venue.timeText}</div>
            </CardContent>
        </Card>
    );
}