import { inject, async, TestBed } from '@angular/core/testing';

import { ElevatorService } from './elevator.service';
import { DumbStrategy } from './strategies/dumb.strategy';
import { ElevatorDirection } from './models/elevator.model';

import { 
  BrowserDynamicTestingModule, 
  platformBrowserDynamicTesting 
} 
from '@angular/platform-browser-dynamic/testing';

describe('Service: ElevatorService', () => {
    let service: ElevatorService;


beforeEach(() => {
        TestBed.resetTestEnvironment();
        TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());

        TestBed.configureTestingModule({
            providers: [
                ElevatorService,
                //{provide: 'IElevatorStrategy', useClass: DumbStrategy }
                {provide: 'IElevatorStrategy', useClass: DumbStrategy }
            ]
        });
});

    beforeEach(inject([ElevatorService], s => {
        service = s;
    }));

    it ('should be occupied', () => {
        service.stepIn();
        expect(service.isOccupied).toBeTruthy();
    });

    it ('should not accept floor request if inner door open', () => {
        service.openInnerDoor();
        service.stepIn();
        expect(service.isOccupied).toBeTruthy();
    });

    it ('should go up', () => {
        service.sendFloorRequest(9);
        setTimeout(() => function() {
            expect(service.getDestination()).toBe(9);
            expect(service.elevator.direction).toBe(ElevatorDirection.Up);
        }, 2000)
    });

    it ('should go down', () => {
        service.elevator.currentFloor = 9;
        service.sendFloorRequest(0);
        setTimeout(() => function() {
            expect(service.getDestination()).toBe(0);
            expect(service.elevator.direction).toBe(ElevatorDirection.Down);
        }, 2000)
    });

    it ('should not be able to open inner door', () => {
        expect(service.canOpenInnerDoor).toBe(false);
    });

    it ('should be able to open inner door', () => {
        service.openOuterDoor(service.getCurrentFloor());
        expect(service.canOpenInnerDoor).toBe(true);
    });

    it ('should stop the lift when inner door is opened', () => {
        service.sendFloorRequest(0);
        service.sendFloorRequest(1);
        service.sendFloorRequest(2);
        service.stepIn();
        service.openInnerDoor();
        expect(service.requestStack.length).toBe(0);
    });

    it ('should not accept duplicate requests', () => {
        service.sendFloorRequest(0);
        service.sendFloorRequest(1);
        service.sendFloorRequest(1);
        expect(service.requestStack).toEqual([0, 1]);
    });
});