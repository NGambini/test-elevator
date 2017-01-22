import { Component, OnInit, OnChanges, SimpleChanges, Input } from '@angular/core';

import { ElevatorService } from '../elevator.service';

@Component({
  selector: 'user-controls',
  template: require('./user-controls.component.html')
})


export class UserControlsComponent {
    constructor(private _elevatorService: ElevatorService) {
    }

    openInnerDoor() {
      this._elevatorService.openInnerDoor();
    }

    canStepIn() {
      return this._elevatorService.isIdle && !this._elevatorService.isOccupied;
    }

    stepIn() {
      this._elevatorService.stepIn();
    }

    stepOut() {
      this._elevatorService.stepOut();
    }

    openDoor() {
      this._elevatorService.openInnerDoor();
    }
}
