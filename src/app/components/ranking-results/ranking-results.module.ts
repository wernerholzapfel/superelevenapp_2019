import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RankingResultsComponent} from './ranking-results.component';
import {FormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import {LoaderModule} from '../loader/loader.module';
import {RouterModule} from '@angular/router';
import {HeaderModule} from '../header/header.module';


@NgModule({
    declarations: [RankingResultsComponent],
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        LoaderModule,
        RouterModule,
        HeaderModule
    ],
    exports: [
        RankingResultsComponent
    ]
})
export class RankingResultsModule {
}
