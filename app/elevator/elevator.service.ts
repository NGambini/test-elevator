import { Injectable, Inject } from '@angular/core';
import { Observable, Subscription } from 'rxjs/Rx';

import { ElevatorDirection, ElevatorModel } from './models/elevator.model';
import { IElevatorStrategy } from './strategies/interface.elevator.strategy';

/* Elevator service used for communication between modules */
@Injectable()
export class ElevatorService {
    private timer;
    public readonly maxFloors = 10;
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

    public getDestination(): number {
        if (this.floorRequestStack.length != 0) {
            return this.floorRequestStack[0];
        }
        return -1;
    }

    public get isOccupied(): boolean {
        return this.elevator.passengers != 0;
    }

    public get isIdle(): boolean {
        return this.elevator.direction == ElevatorDirection.Idle;
    }

    public get requestStack(): Array<number> {
        return this.floorRequestStack;
    }

    public stepIn() {
        this.elevator.passengers = 1;
    }

    public stepOut() {
        this.elevator.passengers = 0;
    }

    public getCurrentFloor() {
        return this.elevator.currentFloor;
    }
}