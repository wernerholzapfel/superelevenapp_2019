import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeaderComponent} from './header.component';
import {IonicModule} from '@ionic/angular';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {LoaderModule} from '../loader/loader.module';

@NgModule({
    declarations: [HeaderComponent],
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        LoaderModule,
        RouterModule,
    ],
    exports: [
        HeaderComponent
    ]
})
export class HeaderModule {
}
