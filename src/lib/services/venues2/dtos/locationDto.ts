export interface LocationDto {
    DataCenter: string | null;
    World: string | null;
    District: string | null;
    Ward: number;
    Plot: number;
    Apartment: number;
    Room: number;
    Subdivision: boolean;
    Override: string | null;
}