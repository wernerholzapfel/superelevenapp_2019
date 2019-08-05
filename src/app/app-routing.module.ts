import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from './guards/auth.guard';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        loadChildren: './home/home.module#HomePageModule'
    },
    {
        path: 'prediction',
        loadChildren: './predictions_tab/predictions_tab.module#PredictionsTabModule',
        canActivate: [AuthGuard]
    },
    {
        path: 'preperation',
        loadChildren: './preperations_tab/preperations_tab.module#PreperationsTabModule',
        canActivate: [AuthGuard] // todo adminGuard
    },
    {
        path: 'results',
        loadChildren: './results_tab/results_tab.module#ResultsTabModule',
        canActivate: [AuthGuard] // todo adminGuard
    },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
