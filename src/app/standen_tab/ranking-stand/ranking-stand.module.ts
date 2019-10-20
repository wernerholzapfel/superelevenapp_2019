import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';

import {IonicModule} from '@ionic/angular';

import {RankingStandPage} from './ranking-stand.page';
import {HeaderModule} from '../../components/header/header.module';
import {RankingResultsComponent} from '../../components/ranking-results/ranking-results.component';
import {RankingResultsModule} from '../../components/ranking-results/ranking-results.module';

const routes: Routes = [
    {
        path: '',
        component: RankingStandPage
    }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes),
        RankingResultsModule,
        HeaderModule
    ],
    entryComponents: [RankingResultsComponent],
    declarations: [RankingStandPage]
})
export class RankingStandPageModule {
}
