import type { Location } from "@/lib/model/location.ts";

type LocationProps = {
    location: Location;
    shorten?: boolean;
    className: string;
};

export function LocationText({ location, shorten, className }: LocationProps) {
    if (location.override) {
        if (shorten && location.override.length > 50)
            return <span className={className}>{ `${location.override.substring(0, 50)}...` }</span>
        else
            return <span className={className}>{location.override}</span>
    }

    if (location.apartment)
        return <span className={className}>{`${location.dataCenter}, ${location.world}, ${location.district}, Ward ${location.ward}${location.subdivision ? " Sub" : ''}, Apt ${location.apartment}`}</span>

    return <span className={className}>{`${location.dataCenter}, ${location.world}, ${location.district}, Ward ${location.ward}, Plot ${location.plot}${location.room ? `, Room ${location.room}` : ''}`}</span>
}
