import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {QuestionResultFormComponent} from './question-result-form.component';
import {FormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import {HeaderModule} from '../header/header.module';
import {RoundSelectorModule} from '../round-selector/round-selector.module';


@NgModule({
    declarations: [QuestionResultFormComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HeaderModule,
    RoundSelectorModule,
  ],
    exports: [QuestionResultFormComponent]
})
export class QuestionResultFormModule {
}
