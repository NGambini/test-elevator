import { Injectable, Inject } from '@angular/core';
import { Observable, Subscription } from 'rxjs/Rx';

import { ElevatorDirection, ElevatorModel } from './models/elevator.model';
import { IElevatorStrategy } from './strategies/interface.elevator.strategy';

/* Elevator service used for communication between modules */
@Injectable()
export class ElevatorService {
    private timer;
    private readonly maxFloors = 10;
    private readonly maxPassengers = 2;
    private floorRequestStack: Array<number>;
    public elevator: ElevatorModel;
    private strategy: IElevatorStrategy;


    constructor(@Inject("IElevatorStrategy") strategy: IElevatorStrategy) {
        this.elevator = new ElevatorModel(ElevatorDirection.Idle, false, false, 0, this.maxFloors, 0, 2);
        this.floorRequestStack = new Array<number>();
        this.timer = Observable.timer(1000, 1000);
        this.timer.subscribe(t => this.elevatorInterval());
        this.strategy = strategy;
        this.strategy.initStrategy(this.elevator, this.floorRequestStack);
    }

    // Called each second
    private elevatorInterval() {
        this.elevator.updatePosition();
        this.strategy.orderRequests();
        this.strategy.decideNextDirection();
    }

    sendFloorRequest(floor: number) {
        this.strategy.sendFloorRequest(floor);
    }

    public openInnerDoor() {
        this.elevator.tryToOpenDoor();
    }

    public closeInnerDoor() {
        this.elevator.closeDoor();
    }

    public getCurrentFloor() {
        return this.elevator.currentFloor;
    }
}