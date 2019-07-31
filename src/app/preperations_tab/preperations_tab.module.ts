import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';

import {IonicModule} from '@ionic/angular';

import {CanDeactivateGuard} from '../guards/candeactivate.guard';
import {PreperationsTabPage} from './preperations_tab.page';

const routes: Routes = [
    {
        path: 'preperation',
        component: PreperationsTabPage,
        canDeactivate: [CanDeactivateGuard],
        children: [
            {
                path: 'players',
                loadChildren: '../preperations_tab/players/players.module#PlayersPageModule',
            },
            {
                path: 'matches',
                loadChildren: '../preperations_tab/matches/matches.module#MatchesPageModule',
            }, {
                path: 'questions',
                loadChildren: '../preperations_tab/questions/questions.module#QuestionsPageModule',
            },
            {
                path: 'ranking',
                loadChildren: '../preperations_tab/ranking/ranking.module#RankingPageModule',
            }]
    }, {
        path: '',
        redirectTo: 'preperation/players',
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
    declarations: [PreperationsTabPage]
})
export class PreperationsTabModule {
}
