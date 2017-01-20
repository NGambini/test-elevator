import { ElevatorDirection, ElevatorModel } from '../models/elevator.model';

/* Interface for implementing an elevator algorithm */
export interface IElevatorStrategy {
    /* Init the strategy passing elevator model and request stack */ 
    initStrategy(elevator: ElevatorModel, floorRequestStack: Array<number>);

    /* At each tick, reorder request priorities before processing */
    orderRequests();

    /* At each tick, decides next way to go */
    decideNextDirection();

    /* When the lift is called, we can implement a custom behavior */
    sendFloorRequest(floor: number);
}