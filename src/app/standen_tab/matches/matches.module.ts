import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';

import {IonicModule} from '@ionic/angular';

import {MatchesPage} from './matches.page';
import {HeaderModule} from '../../components/header/header.module';
import {MatchCardModule} from '../../components/match-card/match-card.module';

const routes: Routes = [
    {
        path: '',
        component: MatchesPage
    }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        HeaderModule,
        MatchCardModule,
        RouterModule.forChild(routes)
    ],
    declarations: [MatchesPage]
})
export class MatchesPageModule {
}
