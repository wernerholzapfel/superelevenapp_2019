import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';

import {IonicModule} from '@ionic/angular';

import {StandMatchesPage} from './stand.matches.page';
import {HeaderModule} from '../../components/header/header.module';
import {MatchCardModule} from '../../components/match-card/match-card.module';
import {MatchCardComponent} from '../../components/match-card/match-card.component';

const routes: Routes = [
    {
        path: '',
        component: StandMatchesPage
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
    entryComponents: [MatchCardComponent],
    declarations: [StandMatchesPage]
})
export class StandMatchesPageModule {
}
