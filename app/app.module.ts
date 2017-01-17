import { NgModule, Injector } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, JsonpModule, Http } from '@angular/http';
import { routing, appRoutingProviders } from './app.routing';
import { BrowserXhr } from '@angular/http';

import { TranslateModule, TranslateStaticLoader, TranslateLoader } from 'ng2-translate';


/* Mine - Components */
import { AppComponent } from './app.component';
import { ElevatorMainComponent } from './elevator/elevator-main.component';


/* Mine - services */
import { StorageService } from './common/storage/storage.service';

@NgModule({
    declarations: [
        AppComponent,
        ElevatorMainComponent
    ],
    imports: [
        BrowserModule,
        JsonpModule,
        HttpModule,
        TranslateModule.forRoot({
            provide: TranslateLoader,
            useFactory: (http: Http) => new TranslateStaticLoader(http, 'dist/assets/i18n', '.json'),
            deps: [Http]
        }),
        routing
    ],
    providers: [
        Title,
        appRoutingProviders,
        StorageService,
        
    ],
    bootstrap: [AppComponent]
})

export class AppModule {

}
