import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';

import {IonicModule} from '@ionic/angular';

import {TeamPage} from './team.page';
import {HeaderModule} from '../../components/header/header.module';
import {CanDeactivateGuard} from '../../guards/candeactivate.guard';
import {AddplayerPageModule} from './addplayer/addplayer.module';

const routes: Routes = [
    {
        path: '',
        component: TeamPage,
        canDeactivate: [CanDeactivateGuard]
    }];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        HeaderModule,
        RouterModule.forChild(routes)
    ],
    declarations: [TeamPage]
})
export class TeamPageModule {
}
