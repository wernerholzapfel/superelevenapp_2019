import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';

import {IonicModule} from '@ionic/angular';

import {MatchesPage} from './matches.page';
import {HeaderModule} from '../../components/header/header.module';
import {CanDeactivateGuard} from '../../guards/candeactivate.guard';
import {MatchCardModule} from '../../components/match-card/match-card.module';
import {VirtualScrollerModule} from 'ngx-virtual-scroller';

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
        VirtualScrollerModule,
        HeaderModule,
        RouterModule.forChild(routes),
        MatchCardModule
    ],
    declarations: [MatchesPage]
})
export class MatchesPageModule {
}
