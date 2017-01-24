import { NgModule, Injector } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, JsonpModule, Http } from '@angular/http';
import { routing, appRoutingProviders } from './app.routing';

/* Material design */
import { MaterialModule } from '@angular/material';
import { MdCardModule } from '@angular/material/card';
import { MdToolbarModule } from '@angular/material/toolbar';
import { MdSelectModule } from '@angular/material/select';
import { MdRadioModule } from '@angular/material/radio';
import { MdButtonModule } from '@angular/material/button';
import { MdListModule } from '@angular/material/list';
import { MdIconModule } from '@angular/material/icon';
import { MdIconRegistry } from '@angular/material/icon';

/* ng2 translate */
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
import { SmartStrategy } from './elevator/strategies/smart.strategy';

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
        FormsModule,
        HttpModule,
        MaterialModule.forRoot(),
        MdCardModule,
        MdButtonModule,
        MdIconModule,
        MdToolbarModule,
        MdRadioModule,
        MdSelectModule,
        MdListModule,
        TranslateModule.forRoot({
            provide: TranslateLoader,
            useFactory: (http: Http) => new TranslateStaticLoader(http, 'app/i18n', '.json'),
            deps: [Http]
        }),
        routing
    ],
    providers: [
        Title,
        appRoutingProviders,
        StorageService,
        ElevatorService,
        //{provide: 'IElevatorStrategy', useClass: DumbStrategy }
        {provide: 'IElevatorStrategy', useClass: SmartStrategy }
    ],
    bootstrap: [AppComponent]
})

export class AppModule {

}
