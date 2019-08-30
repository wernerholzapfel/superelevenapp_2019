import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import {LoaderModule} from '../loader/loader.module';
import {RouterModule} from '@angular/router';
import {MatchCardComponent} from './match-card.component';


@NgModule({
    declarations: [MatchCardComponent],
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        LoaderModule,
        RouterModule,
    ],
    exports: [
        MatchCardComponent
    ]
})
export class MatchCardModule {
}

