import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import {HeaderModule} from '../../components/header/header.module';
import {StatsGekozenPage} from './stats-gekozen.page';

const routes: Routes = [
  {
    path: '',
    component: StatsGekozenPage
  }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes),
        HeaderModule
    ],
  declarations: [StatsGekozenPage]
})
export class StatsGekozenPageModule {}
