import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { QuestionsPage } from './questions.page';
import {HeaderModule} from '../../components/header/header.module';
import {CanDeactivateGuard} from '../../guards/candeactivate.guard';
import {QuestionResultFormComponent} from '../../components/question-result-form/question-result-form.component';
import {QuestionResultFormModule} from '../../components/question-result-form/question-result-form.module';

const routes: Routes = [
  {
    path: '',
    component: QuestionsPage,
    canDeactivate: [CanDeactivateGuard]
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HeaderModule,
    RouterModule.forChild(routes),
    QuestionResultFormModule
  ],
  declarations: [QuestionsPage],
  entryComponents: [QuestionResultFormComponent]
})
export class QuestionsPageModule {}
