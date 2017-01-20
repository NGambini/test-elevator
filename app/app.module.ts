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
import { FloorControlsComponent } from './elevator/floor-controls/floor-controls.component';
import { UserControlsComponent } from './elevator/user-controls/user-controls.component';
import { CarControlsComponent } from './elevator/car-controls/car-controls.component';

/* Mine - services */
import { StorageService } from './common/storage/storage.service';
import { ElevatorService } from './elevator/elevator.service'

/* Mine - elevator strategies */ 

import { DumbStrategy } from './elevator/strategies/dumb.strategy';

/* Mine - models */
import { ElevatorModel } from './elevator/models/elevator.model';

@NgModule({
    declarations: [
        AppComponent,
        ElevatorMainComponent,
        FloorControlsComponent,
        UserControlsComponent,
        CarControlsComponent
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
        ElevatorService,
        {provide: 'IElevatorStrategy', useClass: DumbStrategy }
    ],
    bootstrap: [AppComponent]
})

export class AppModule {

}
