import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';

import {IonicModule} from '@ionic/angular';

import {MatchesPage} from './matches.page';
import {HeaderModule} from '../../components/header/header.module';
import {CanDeactivateGuard} from '../../guards/candeactivate.guard';
import {RoundSelectorModule} from '../../components/round-selector/round-selector.module';
import {MatchesCardModule} from '../../components/matches-card/matches-card.module';

const routes: Routes = [
    {
        path: '',
        component: MatchesPage,
        canDeactivate: [CanDeactivateGuard]
    }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        HeaderModule,
        RoundSelectorModule,
        MatchesCardModule,
        RouterModule.forChild(routes)
    ],
    declarations: [MatchesPage]
})
export class MatchesPageModule {
}
