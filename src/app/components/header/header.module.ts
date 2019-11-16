import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeaderComponent} from './header.component';
import {IonicModule} from '@ionic/angular';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {LoaderModule} from '../loader/loader.module';
import {ScrollVanishDirective} from '../../directives/scroll-vanish.directive';

@NgModule({
    declarations: [HeaderComponent, ScrollVanishDirective],
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        LoaderModule,
        RouterModule,
    ],
    exports: [
        HeaderComponent,
        ScrollVanishDirective
    ]
})
export class HeaderModule {
}
