import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';

import {IonicModule} from '@ionic/angular';

import {PredictionsTabPage} from './predictions_tab.page';
import {CanDeactivateGuard} from '../guards/candeactivate.guard';
import {TeamPage} from './team/team.page';
import {MatchesPage} from './matches/matches.page';
import {QuestionsPage} from './questions/questions.page';
import {RankingPage} from './ranking/ranking.page';

const routes: Routes = [
    {
        path: 'prediction',
        component: PredictionsTabPage,
        canDeactivate: [CanDeactivateGuard],
        children: [
            {
                path: 'team',
                loadChildren: '../predictions_tab/team/team.module#TeamPageModule',
            },
            {
                path: 'matches',
                loadChildren: '../predictions_tab/matches/matches.module#MatchesPageModule',
            }, {
                path: 'questions',
                loadChildren: '../predictions_tab/questions/questions.module#QuestionsPageModule',
            },
            {
                path: 'ranking',
                loadChildren: '../predictions_tab/ranking/ranking.module#RankingPageModule',
            }]
    }, {
        path: '',
        redirectTo: 'prediction/team',
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
    declarations: [PredictionsTabPage]
})
export class PredictionsTabModule {
}
