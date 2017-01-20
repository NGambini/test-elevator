import { Component, OnInit, OnChanges, SimpleChanges, Input } from '@angular/core';

@Component({
  selector: 'car-controls',
  template: require('./car-controls.component.html')
})

export class CarControlsComponent implements OnInit, OnChanges {
    @Input()
    public numberOfFloors: number;
    private floors = new Array<boolean>();

    constructor() {  }

     ngOnInit() {
        for (let i = 0 ; i < this.numberOfFloors ; i++) {
            this.floors.push(false);
        }
    }

    /* Called when input parameter changes */
    ngOnChanges(changes: SimpleChanges) {
        /* We can only add floors because reasons */
        if (changes['numberOfFloors'].currentValue > this.numberOfFloors) {
            for (let i = this.numberOfFloors ; i < changes['numberOfFloors'].currentValue ; i++) {
                this.floors.push(false);
            }
            this.numberOfFloors = changes['numberOfFloors'].currentValue;
        }
    }
}
