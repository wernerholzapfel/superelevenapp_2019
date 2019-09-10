import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { StatsPuntenPage } from './stats-punten.page';
import {PlayerStandItemModule} from '../../components/player-stand-item/player-stand-item.module';
import {HeaderModule} from '../../components/header/header.module';

const routes: Routes = [
  {
    path: '',
    component: StatsPuntenPage
  }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes),
        PlayerStandItemModule,
        HeaderModule
    ],
  declarations: [StatsPuntenPage]
})
export class StatsPuntenPageModule {}
