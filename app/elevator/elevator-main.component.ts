import { Component } from '@angular/core';

import { ElevatorService } from './elevator.service';

@Component({
    selector: 'elevator-main',
    template: require('./elevator-main.component.html')
})

/* Parent component for the elevator page */
export class ElevatorMainComponent {
        constructor(private _elevatorService: ElevatorService) {
    }

    
}