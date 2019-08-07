import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';

import {IonicModule} from '@ionic/angular';

import {CanDeactivateGuard} from '../guards/candeactivate.guard';
import {StandenTabPage} from './standen_tab.page';

const routes: Routes = [
    {
        path: 'standen',
        component: StandenTabPage,
        canDeactivate: [CanDeactivateGuard],
        children: [
            {
                path: 'players',
                loadChildren: '../standen_tab/players/players.module#PlayersPageModule',
            },
            {
                path: 'totaal',
                loadChildren: '../standen_tab/totaal/totaal.module#TotaalPageModule',
            }
        ]
    }, {
        path: '',
        redirectTo: 'standen/players',
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
    declarations: [StandenTabPage]
})
export class StandenTabModule {
}
