import { inject, async, TestBed } from '@angular/core/testing';

import { ElevatorService } from './elevator.service';
import { ElevatorDirection } from './models/elevator.model';

describe('Service: ElevatorService', () => {
    let service: ElevatorService;

    beforeEach(() => TestBed.configureTestingModule({
        providers: [ ElevatorService ]
    }));

    beforeEach(inject([ElevatorService], s => {
        service = s;
    }));

    it ('should be occupied', () => {
        service.stepIn();
        expect(service.isOccupied).toBeTruthy();
    });

    it ('should not accept floor request if inner door open', () => {
        service.openInnerDoor();
        expect(service.isOccupied).toBeTruthy();
    });

    it ('should go up', () => {
        service.sendFloorRequest(9);
        expect(service.getDestination()).toBe(9);
        expect(service.elevator.direction).toBe(ElevatorDirection.Up);
    });

    it ('should go down', () => {
        service.elevator.currentFloor = 9;
        service.sendFloorRequest(0);
        expect(service.getDestination()).toBe(0);
        expect(service.elevator.direction).toBe(ElevatorDirection.Down);
    });
});