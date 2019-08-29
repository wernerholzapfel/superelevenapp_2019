import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';

import {IonicModule} from '@ionic/angular';
import {HeaderModule} from '../../components/header/header.module';
import {CanDeactivateGuard} from '../../guards/candeactivate.guard';
import {FormationLineModule} from '../../formation-line/formation-line.module';
import {PlayersPage} from './players.page';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {RoundSelectorModule} from '../../components/round-selector/round-selector.module';

const routes: Routes = [
    {
        path: '',
        component: PlayersPage,
        canDeactivate: [CanDeactivateGuard]
    }];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        HeaderModule,
        FormationLineModule,
        DragDropModule,
        RoundSelectorModule,
        RouterModule.forChild(routes)
    ],
    declarations: [PlayersPage]
})
export class PlayersPageModule {
}
