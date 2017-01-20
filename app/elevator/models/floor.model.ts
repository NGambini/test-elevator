export enum FloorLight {
    None = 0,
    Red = 1,
    Green = 2
}

export class FloorModel {
    constructor(public floorNumber: number,
                public canOpenDoor: boolean,
                public light: FloorLight) {}
}