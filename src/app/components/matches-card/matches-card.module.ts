import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import {MatchesCardComponent} from './matches-card.component';
import {RoundSelectorModule} from '../round-selector/round-selector.module';


@NgModule({
    declarations: [MatchesCardComponent],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        IonicModule,
        RoundSelectorModule
    ],
    exports: [MatchesCardComponent]
})
export class MatchesCardModule {
}
