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
    const isOpen = venue.status === VenueStatus.Open;
    const isNew  = venue.status === VenueStatus.New;

    const glowClass = isOpen
        ? "shadow-[inset_0_0_0_3px_rgba(232,121,249,1),0_0_20px_rgba(232,121,249,0.6)]"
        : isNew
            ? "shadow-[inset_0_0_0_3px_rgba(34,197,94,1),0_0_18px_rgba(34,197,94,0.6)]"
            : ""

    const pingOuter = isOpen
        ? "bg-fuchsia-500"
        : isNew
            ? "bg-green-500"
            : "";

    const pingInner = isOpen
        ? "bg-fuchsia-400"
        : isNew
            ? "bg-green-400"
            : "";

    return (
        <Card className="rounded-xl overflow-visible pt-0">
            <div className="relative">
                <img
                    src={venue.imageUrl}
                    alt={venue.name}
                    loading="lazy"
                    className="block w-full object-cover rounded-t-xl"
                />

                {glowClass && (
                    <div className={`pointer-events-none absolute inset-0 rounded-t-xl ${glowClass}`} />
                )}

                {(isOpen || isNew) && (
                    <span className="absolute left-3 top-3 flex h-3 w-3">
                        <span className={`absolute inline-flex h-full w-full animate-ping rounded-full, ${pingOuter} opacity-75`} />
                        <span className={`relative inline-flex h-3 w-3 rounded-full ${pingInner}`} />
                    </span>
                )}
            </div>

            <CardContent className="pt-1 py-0 text-right">
                <div className="text-lg font-semibold leading-none">{venue.name}</div>
                <div className="text-sm font-medium text-muted-foreground">{venue.timeText}</div>
            </CardContent>
        </Card>
    );
}