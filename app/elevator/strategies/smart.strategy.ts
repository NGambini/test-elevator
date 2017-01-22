import { Injectable, Inject } from '@angular/core';

import { IElevatorStrategy } from './interface.elevator.strategy';

import { ElevatorDirection, ElevatorModel } from '../models/elevator.model';

/* Smart strategy processing requests in best order */
@Injectable()
export class SmartStrategy implements IElevatorStrategy {
    // our model
    private _elevator: ElevatorModel;

    // The floor requests
    private _floorRequestStack: Array<number>;
    
    // How many ticks we must wait before continuing
    private readonly defaultWaitTicks = 3;

    // How many ticks are left
    private waitTicks = -1;

    initStrategy(elevator: ElevatorModel, floorRequestStack: Array<number>) {
        this._elevator = elevator;
        this._floorRequestStack = floorRequestStack;
    }

    /* Do nothing, simply remove a floor if we reached it and waited long enough */
    orderRequests() {
        let requestsOnpath: Array<number>;
        if (this._floorRequestStack.length == 0) {
            return;
        }
        if (this.waitTicks == 0 && this._elevator.currentFloor == this._floorRequestStack[0]) {
            this._floorRequestStack.shift();
        }

        if (this._elevator.currentFloor > this._floorRequestStack[0]) { 
            requestsOnpath =  this._floorRequestStack.filter(f => f < this._elevator.currentFloor);
            // sort descending
            requestsOnpath = requestsOnpath.sort((a, b) => b - a);
            //Replace part of the array
            let args = [0, requestsOnpath.length].concat(requestsOnpath);
            console.log("args = " + args.toString());
          //              console.log("sorted = " + requestsOnpath.toString());
            Array.prototype.splice.apply(this._floorRequestStack, args);
            //console.log("after splice : " +  this._floorRequestStack.toString());
        }
        else if (this._elevator.currentFloor < this._floorRequestStack[0]) {
            requestsOnpath = this._floorRequestStack.filter(f => f > this._elevator.currentFloor);
            // sort ascending
            requestsOnpath = requestsOnpath.sort((a, b) => a - b);
            //Replace part of the array
            let args = [0, requestsOnpath.length].concat(requestsOnpath);
            console.log("args = " + args.toString());
           // console.log("sorted = " + requestsOnpath.toString());
            Array.prototype.splice.apply(this._floorRequestStack, args);
           // console.log("after splice : " +  this._floorRequestStack.toString());
        }
    }

    /* Decides whether we must wait so the user has time to enter */
    private shouldWaitAtFloor(): Boolean {
        if (this.waitTicks >= 0) {
            this.waitTicks--;
            return true;
        }
        if (this._floorRequestStack.length != 0) {
            let request = this._floorRequestStack[0];
            if (this._elevator.currentFloor == request) {
                    this.waitTicks = this.defaultWaitTicks;
                    return true;
            }
        }
        return false;
    }

    /* Simply go to the next floor in the queue */
    decideNextDirection() {
        let nextDirection;
        if (this._floorRequestStack.length == 0 ||
        (this._elevator.isOccupied && this._elevator.doorOpen) ||
        this.shouldWaitAtFloor()) {
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

    /* Requests a floor */
    public sendFloorRequest(floor: number) {
        // No duplicates
        if (this._floorRequestStack.includes(floor)) return null;
        this._floorRequestStack.push(floor);
    }
}