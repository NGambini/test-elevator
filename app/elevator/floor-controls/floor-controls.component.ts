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
        console.log("in init : " + this.numberOfFloors);
        for (let i = 0 ; i < this.numberOfFloors ; i++) {
            this.floors.push(new FloorModel(i, false, FloorLight.None));
        }
    }

    public isFloorActive(model: FloorModel) {
        return this._elevatorService.getCurrentFloor() == model.floorNumber;
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
        console.log("call elevator");
        this._elevatorService.sendFloorRequest(floor);
    }
}