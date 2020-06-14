import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';

import {IonicModule} from '@ionic/angular';

import {CanDeactivateGuard} from '../guards/candeactivate.guard';
import {StandenTabPage} from './standen_tab.page';
import {HeaderModule} from '../components/header/header.module';
import {RoundSelectorModule} from '../components/round-selector/round-selector.module';

const routes: Routes = [
    {
        path: 'standen',
        component: StandenTabPage,
        children: [
            {
                path: 'players',
                loadChildren: '../standen_tab/players/players.module#PlayersPageModule',
            }, {
                path: 'matches',
                loadChildren: '../standen_tab/matches/stand.matches.module#StandMatchesPageModule',
            }, {
                path: 'ranking',
                loadChildren: '../standen_tab/ranking-stand/ranking-stand.module#RankingStandPageModule',
            }, {
                path: 'questions',
                loadChildren: '../standen_tab/questions-stand/questions-stand.module#QuestionsStandPageModule',
            }, {
                path: 'totaal',
                loadChildren: '../standen_tab/totaal/totaal.module#TotaalPageModule',
            }
        ]
    }, {
        path: '',
        redirectTo: 'standen/totaal',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes),
        HeaderModule,
        RoundSelectorModule
    ],
    declarations: [StandenTabPage]
})
export class StandenTabModule {
}
