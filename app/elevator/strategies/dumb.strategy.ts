import { Injectable, Inject } from '@angular/core';

import { IElevatorStrategy } from './interface.elevator.strategy';

import { ElevatorDirection, ElevatorModel } from '../models/elevator.model';

@Injectable()
export class DumbStrategy implements IElevatorStrategy {
        private _elevator: ElevatorModel;
        private _floorRequestStack: Array<number>;

    initStrategy(elevator: ElevatorModel, floorRequestStack: Array<number>) {
        this._elevator = elevator;
        this._floorRequestStack = floorRequestStack;
    }

    /* Do nothing, simply remove a floor if we reached it */
    orderRequests() {
        if (this._floorRequestStack.length == 0) {
            return;
        }
        if (this._elevator.currentFloor == this._floorRequestStack[0]) {
            this._floorRequestStack.shift();
        }
    }

    /* Simply go to the next floor in the queue */
    decideNextDirection() {
        let nextDirection;
        if (this._floorRequestStack.length == 0) {
            nextDirection = ElevatorDirection.Idle;
        }
        else if (this._floorRequestStack[0] > this._elevator.currentFloor) {
            nextDirection = ElevatorDirection.Up;
        }
        else if (this._floorRequestStack[0] < this._elevator.currentFloor) {
            nextDirection = ElevatorDirection.Down;
        }

        this._elevator.setDirection(nextDirection);
    }

    public sendFloorRequest(floor: number) {
        // No duplicates
        if (this._floorRequestStack.includes(floor)) return null;
        this._floorRequestStack.push(floor);
    }
}