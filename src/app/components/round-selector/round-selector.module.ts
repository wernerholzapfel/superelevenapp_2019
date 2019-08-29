import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import {RoundSelectorComponent} from './round-selector.component';


@NgModule({
    declarations: [RoundSelectorComponent],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        IonicModule,
    ],
    exports: [RoundSelectorComponent]
})
export class RoundSelectorModule {
}
