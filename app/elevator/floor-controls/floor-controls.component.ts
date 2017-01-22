import { Component, OnInit, OnChanges, SimpleChanges, Input } from '@angular/core';

import { ElevatorService } from '../elevator.service';
import { FloorModel, FloorLight } from '../models/floor.model';

@Component({
  selector: 'floor-controls',
  template: require('./floor-controls.component.html')
})

/* Component displaying the buttons on each floor outside of the lift */
export class FloorControlsComponent implements OnInit, OnChanges {
    @Input()
    public numberOfFloors: number;
    private floors = new Array<FloorModel>();

    constructor(private _elevatorService: ElevatorService) {
    }

    ngOnInit() {
        for (let i = 0 ; i < this.numberOfFloors ; i++) {
            this.floors.push(new FloorModel(i, false, FloorLight.None));
        }
    }

    private isElevatorAtFloor(floor: number): boolean {
        return this._elevatorService.getCurrentFloor() == floor;
    }

    private get reverseFloors() {
        return this.floors.slice().reverse();
    }

    private canOpenDoor(floor: FloorModel) {
        return this._elevatorService.isIdle &&
        this._elevatorService.getCurrentFloor() == floor.floorNumber && !floor.doorOpen;
    }

    private openDoor(floor: FloorModel) {
        floor.doorOpen = true;
        this._elevatorService.openOuterDoor(floor.floorNumber);
    }

    private closeDoor(floor: FloorModel) {
        floor.doorOpen = false;
        this._elevatorService.closeOuterDoor(floor.floorNumber);
    }

    private getLightBulbColor(floor: FloorModel): string {
        if (this._elevatorService.isOccupied) {
            return "red";
        }
        else if (this._elevatorService.getDestination() == floor.floorNumber) {
            return "green";
        }
        else {
            return "black";
        }
    } 

    /* Called when input parameter changes */
    ngOnChanges(changes: SimpleChanges) {
        /* We can only add floors because reasons */
        if (changes['numberOfFloors'].currentValue > this.numberOfFloors) {
            for (let i = this.numberOfFloors ; i < changes['numberOfFloors'].currentValue ; i++) {
                this.floors.push(new FloorModel(i, false, FloorLight.None));
            }
            this.numberOfFloors = changes['numberOfFloors'].currentValue;
        }
    }

    callElevator(floor: number) {
        this._elevatorService.sendFloorRequest(floor);
    }
}