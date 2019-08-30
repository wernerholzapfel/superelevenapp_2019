import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';

import {IonicModule} from '@ionic/angular';

import {SpelregelsPage} from './spelregels.page';
import {HeaderModule} from '../components/header/header.module';

const routes: Routes = [
    {
        path: '',
        component: SpelregelsPage
    }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        HeaderModule,
        RouterModule.forChild(routes)
    ],
    declarations: [SpelregelsPage]
})
export class SpelregelsPageModule {
}
