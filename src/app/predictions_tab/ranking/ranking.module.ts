import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import {RouterModule} from '@angular/router';

import {RankingPage} from './ranking.page';
import {HeaderModule} from '../../components/header/header.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        HeaderModule,
        RouterModule.forChild([
            {
                path: '',
                component: RankingPage
            }
        ])
    ],
    declarations: [RankingPage]
})
export class RankingPageModule {
}
