import type { LocationDto } from "../services/venues/dtos/locationDto";

class Location {
    dataCenter: string;
    world: string;
    district: string;
    ward: number;
    plot: number;
    apartment: number;
    room: number;
    subdivision: boolean;
    shard: string;
    override: string;

    constructor(locationDto: LocationDto) {
        this.dataCenter = locationDto.dataCenter;
        this.world = locationDto.world;
        this.district = locationDto.district;
        this.ward = locationDto.ward;
        this.plot = locationDto.plot;
        this.apartment = locationDto.apartment;
        this.room = locationDto.room;
        this.subdivision = locationDto.subdivision;
        this.shard = locationDto.shard;
        this.override = locationDto.override;
    }

    toString(shorten: boolean = false): string {
        if (this.override) {
            if (shorten && this.override.length > 50)
                return `${this.override.substring(0, 50)}...`
            else
                return this.override
        }

        if (this.apartment)
            return `${this.dataCenter}, ${this.world}, ${this.district}, Ward ${this.ward}${this.subdivision ? " Sub" : ''}, Apt ${this.apartment}`

        return `${this.dataCenter}, ${this.world}, ${this.district}, Ward ${this.ward}, Plot ${this.plot}${this.room ? `, Room ${this.room}` : ''}`
    }

}

export { Location };
