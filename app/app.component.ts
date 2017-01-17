import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Http } from "@angular/http";

import { StorageService } from './common/storage/storage.service';
import { Subscription } from 'rxjs/Subscription';
import { TranslateService } from 'ng2-translate';

import 'bootstrap/dist/css/bootstrap.css';

@Component({
    selector: 'wopata-lift',
    template: require('./app.component.html')
})

export class AppComponent {
    private _routeSubscription: Subscription;

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private storage: StorageService,
        private translate: TranslateService) 
    { }

    ngOnInit() {
        this.subscribe();
    }

    ngOnDestroy() {
        this._routeSubscription.unsubscribe();
    }

    private subscribe() {
        // subscribe to router event
        // to get language set in URL params
        this._routeSubscription = this.activatedRoute.queryParams.subscribe(
          (param: any) => {
            let lang = param['lang'];
            this.setLanguage(lang);
          });
    }

    private setLanguage(lang: string) {
        // EN language will be used as a fallback when a translation isn't found in the current language
        // NB: have to force the loading of en language before using it as default language,
        //     otherwise it's never loaded.
        //     More info @ https://github.com/ocombe/ng2-translate/issues/332
        this.translate.use('en');
        this.translate.setDefaultLang('en');
        if (lang) {
            this.translate.use(lang);
        }
        else {
            // try to get saved language in local localStorage (from user settings)
            let userLang : string = this.storage.read('user.lang');

            // if no saved language, use navigator lang if available otherwise use en
            if (!userLang)
            {
                userLang = navigator.language.split('-')[0]; 
                userLang = /(fr|zn|en)/gi.test(userLang) ? userLang : 'en';
            }
            this.translate.use(userLang);
        }
    }
}
