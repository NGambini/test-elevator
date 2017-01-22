import { Component } from '@angular/core';
import { TranslateService } from 'ng2-translate';

import { ElevatorService } from './elevator.service';

@Component({
    selector: 'elevator-main',
    template: require('./elevator-main.component.html')
})

/* Parent component for the elevator page */
export class ElevatorMainComponent {
    private lang: string;

    constructor(private _elevatorService: ElevatorService,
                private _translateService: TranslateService) {
        this.lang = this._translateService.currentLang;
    }

    setLang() {
        this._translateService.use(this.lang);
    }

    get requestStack():Array<number> {
        return this._elevatorService.requestStack;
    }
}