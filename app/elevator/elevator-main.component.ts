import { Component, OnInit } from '@angular/core';
import { TranslateService } from 'ng2-translate';

import { ElevatorService } from './elevator.service';
import { StorageService } from '../common/storage/storage.service';

@Component({
    selector: 'elevator-main',
    template: require('./elevator-main.component.html')
})

/* Parent component for the elevator page */
export class ElevatorMainComponent implements OnInit {
    private lang: string;

    constructor(private _elevatorService: ElevatorService,
                private _translateService: TranslateService,
                private _storageService: StorageService) {
    }

    ngOnInit() {
        this.lang = this._storageService.read("user.lang");
        console.log("current lang = " + this._storageService.read("user.lang"));
    }

    setLang() {
        this._translateService.use(this.lang);
        this._storageService.store("user.lang", this.lang);
    }

    get requestStack():Array<number> {
        return this._elevatorService.requestStack;
    }
}