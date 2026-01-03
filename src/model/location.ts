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

}

export { Location };
