import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';

import {IonicModule} from '@ionic/angular';

import {QuestionsStandPage} from './questions-stand.page';
import {HeaderModule} from '../../components/header/header.module';
import {QuestionScoreComponent} from '../../components/question-score/question-score.component';
import {QuestionScoreModule} from '../../components/question-score/question-score.module';

const routes: Routes = [
    {
        path: '',
        component: QuestionsStandPage
    }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes),
        HeaderModule,
        QuestionScoreModule
    ],
    declarations: [QuestionsStandPage],
    entryComponents: [QuestionScoreComponent]
})
export class QuestionsStandPageModule {
}
