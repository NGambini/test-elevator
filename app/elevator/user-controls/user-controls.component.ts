import { Component, OnInit, OnChanges, SimpleChanges, Input } from '@angular/core';

import { ElevatorService } from '../elevator.service';

@Component({
  selector: 'user-controls',
  template: require('./user-controls.component.html')
})


export class UserControlsComponent implements OnInit {
    constructor(private _elevatorService: ElevatorService) {
    }

     ngOnInit() {
        
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
