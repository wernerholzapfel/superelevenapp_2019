import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AddPlayerPage } from './add-player-page.component';
import {HeaderModule} from '../../../components/header/header.module';

const routes: Routes = [
  {
    path: '',
    component: AddPlayerPage
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
  declarations: [AddPlayerPage]
})
export class AddplayerPageModule {}
