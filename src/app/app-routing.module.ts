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
    {
        path: 'standen',
        loadChildren: './standen_tab/standen_tab.module#StandenTabModule',
    },
    {
        path: 'profile',
        loadChildren: './profile/profile.module#ProfileModule',
    },
    {path: 'spelregels', loadChildren: './spelregels/spelregels.module#SpelregelsPageModule'},
    {path: 'stats', loadChildren: './stats-tab/stats-tab.module#StatsTabPageModule'},
    {path: 'stats-punten', loadChildren: './stats-tab/stats-punten/stats-punten.module#StatsPuntenPageModule'},
    {path: 'notification', loadChildren: './notification/notification.module#NotificationPageModule'},
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
