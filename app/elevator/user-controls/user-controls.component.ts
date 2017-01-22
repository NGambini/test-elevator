import { Component, OnInit, OnChanges, SimpleChanges, Input } from '@angular/core';

import { ElevatorService } from '../elevator.service';

@Component({
  selector: 'user-controls',
  template: require('./user-controls.component.html')
})


export class UserControlsComponent {
    constructor(private _elevatorService: ElevatorService) {
    }

    get canOpenInnerDoor() {
      return this._elevatorService.canOpenInnerDoor;
    }

    get canCloseInnerDoor() {
      return this._elevatorService.canCloseInnerDoor;
    }

    get canStepIn() {
      return this._elevatorService.isIdle &&
      this._elevatorService.elevator.doorOpen &&
      !this._elevatorService.isOccupied;
    }

    get canStepOut() {
      return this._elevatorService.elevator.doorOpen;
    }

    openInnerDoor() {
      this._elevatorService.openInnerDoor();
    }

    closeInnerDoor() {
      this._elevatorService.closeInnerDoor();
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
