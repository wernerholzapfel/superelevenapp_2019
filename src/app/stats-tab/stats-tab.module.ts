import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';

import {IonicModule} from '@ionic/angular';

import {StatsTabPage} from './stats-tab.page';

const routes: Routes = [
    {
        path: 'stats',
        component: StatsTabPage,
        children: [
            {
                path: 'gekozen',
                loadChildren: '../stats-tab/stats-gekozen/stats-gekozen.module#StatsGekozenPageModule',
            }, {
                path: 'punten',
                loadChildren: '../stats-tab/stats-punten/stats-punten.module#StatsPuntenPageModule',
            }
        ]
    }, {
        path: '',
        redirectTo: 'stats/punten',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes)
    ],
    declarations: [StatsTabPage]
})
export class StatsTabPageModule {
}
