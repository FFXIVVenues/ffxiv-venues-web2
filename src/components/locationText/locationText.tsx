import type { Location } from "@/lib/model/location.ts";
import {memo} from "react";
import {cn} from "@/lib/utils";

type LocationProps = {
    location: Location;
    shorten?: boolean;
    className?: string;
};

export const LocationText = memo(({ location, shorten, className }: LocationProps) =>
{
    const internalClassName = cn("not-italic", className);

    if (location.override) {
        if (shorten && location.override.length > 50)
            return <span className={internalClassName}>{ `${location.override.substring(0, 50)}...` }</span>
        else
            return <span className={internalClassName}>{location.override}</span>
    }

    if (location.apartment)
        return <span className={internalClassName}>{`${location.dataCenter}, ${location.world}, ${location.district}, Ward ${location.ward}${location.subdivision ? " Sub" : ''}, Apt ${location.apartment}`}</span>

    return <span className={internalClassName}>{`${location.dataCenter}, ${location.world}, ${location.district}, Ward ${location.ward}, Plot ${location.plot}${location.room ? `, Room ${location.room}` : ''}`}</span>
})
