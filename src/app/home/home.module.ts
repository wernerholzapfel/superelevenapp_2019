import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import {RouterModule} from '@angular/router';

import {HomePage} from './home.page';
import {LoginModule} from '../components/login/login.module';
import {HeaderModule} from '../components/header/header.module';
import {HeadlineComponent} from '../components/headline/headline.component';
import {HeadlineModule} from '../components/headline/headline.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        LoginModule,
        HeaderModule,
        HeadlineModule,
        RouterModule.forChild([
            {
                path: '',
                component: HomePage
            }
        ])
    ],
    declarations: [HomePage]
})
export class HomePageModule {
}
