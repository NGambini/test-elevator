

export enum ElevatorDirection {
    Idle = 0,
    Up = 1,
    Down = 2
}

export class ElevatorModel {
    constructor(
        public direction: ElevatorDirection,
        public isOccupied: boolean,
        public doorOpen: boolean,
        public currentFloor: number,
        public maxFloor: number,
        public passengers: number,
        public maxPassengers: number) 
    {

    }

    get isTraveling() {
        return this.direction != ElevatorDirection.Idle;
    }

    get canEnterCar() {
        return this.direction == ElevatorDirection.Idle;
    }

    public tryToOpenDoor() {
        if (this.isTraveling) return false;

        this.doorOpen = true;
    }

    public setDirection(direction: ElevatorDirection) {
        this.direction = direction;
    }

    public closeDoor() {
        this.doorOpen = false;
    }

    public updatePosition() {
        switch (this.direction) {
            case ElevatorDirection.Down:
                this.currentFloor--;
                if (this.currentFloor < 0)
                    this.currentFloor = 0;
                break;
            
            case ElevatorDirection.Up:
                this.currentFloor++;
                if (this.currentFloor > this.maxFloor)
                    this.currentFloor = this.maxFloor;
                break;
            
            case ElevatorDirection.Idle:
                break;
        }
    }

}