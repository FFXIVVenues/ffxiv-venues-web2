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
            return <address className={internalClassName}>{ `${location.override.substring(0, 50)}...` }</address>
        else
            return <address className={internalClassName}>{location.override}</address>
    }

    if (location.apartment)
        return <address className={internalClassName}>{`${location.dataCenter}, ${location.world}, ${location.district}, Ward ${location.ward}${location.subdivision ? " Sub" : ''}, Apt ${location.apartment}`}</address>

    return <address className={internalClassName}>{`${location.dataCenter}, ${location.world}, ${location.district}, Ward ${location.ward}, Plot ${location.plot}${location.room ? `, Room ${location.room}` : ''}`}</address>
})
