export interface LocationDto {
    dataCenter: string | null;
    world: string | null;
    district: string | null;
    ward: number;
    plot: number;
    apartment: number;
    room: number;
    subdivision: boolean;
    override: string | null;
}