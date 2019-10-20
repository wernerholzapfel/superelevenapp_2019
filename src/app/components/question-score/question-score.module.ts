import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {QuestionScoreComponent} from './question-score.component';
import {HeaderModule} from '../header/header.module';
import {IonicModule} from '@ionic/angular';



@NgModule({
  declarations: [QuestionScoreComponent],
  imports: [
    CommonModule,
    HeaderModule,
    IonicModule
  ],
  exports: [QuestionScoreComponent],

})
export class QuestionScoreModule { }
