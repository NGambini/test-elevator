import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ElevatorMainComponent } from './elevator/elevator-main.component';

const appRoutes: Routes = [
    // default
    { path: '', component: ElevatorMainComponent }, 
    // redirect any route to home
    { path: '**', redirectTo: '/', pathMatch: 'full' }
];

export const appRoutingProviders: any[] = [];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
