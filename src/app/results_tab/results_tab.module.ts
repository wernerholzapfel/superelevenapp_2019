import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';

import {IonicModule} from '@ionic/angular';

import {CanDeactivateGuard} from '../guards/candeactivate.guard';
import {ResultsTabPage} from './results_tab.page';

const routes: Routes = [
    {
        path: 'results',
        component: ResultsTabPage,
        canDeactivate: [CanDeactivateGuard],
        children: [
            {
                path: 'players',
                loadChildren: '../results_tab/players/players.module#PlayersPageModule',
            },
            {
                path: 'matches',
                loadChildren: '../results_tab/matches/matches.module#MatchesPageModule',
            }, {
                path: 'questions',
                loadChildren: '../results_tab/questions/questions.module#QuestionsPageModule',
            },
            {
                path: 'ranking',
                loadChildren: '../results_tab/ranking/ranking.module#RankingPageModule',
            }]
    }, {
        path: '',
        redirectTo: 'results/players',
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
    declarations: [ResultsTabPage]
})
export class ResultsTabModule {
}
