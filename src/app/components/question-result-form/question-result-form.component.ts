import {Component, Input, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {QuestionPrediction} from '../../models/question.model';
import {PredictionService} from '../../services/prediction.service';
import {Round} from '../../models/prediction.model';
import {RoundService} from '../../services/round.service';
import {QuestionService} from '../../services/question.service';
import {first, mergeMap} from 'rxjs/operators';
import {forkJoin} from 'rxjs';


export enum QuestionCorrect {
    Full = 'Full',
    Half = 'Half',
    None = 'None',
}

@Component({
    selector: 'app-question-result-form',
    templateUrl: './question-result-form.component.html',
    styleUrls: ['./question-result-form.component.scss'],
})
export class QuestionResultFormComponent implements OnInit {

    @Input() index;
    @Input() questions;
    activeQuestion;
    answers: QuestionPrediction[];
    rounds: Round[];
    questionCorrectness = QuestionCorrect;

    constructor(private modalController: ModalController,
                private roundService: RoundService,
                private questionService: QuestionService,
                private predictionService: PredictionService) {
    }

    ngOnInit() {
        this.roundService.getPlayedRounds().subscribe(rounds => {
            this.rounds = rounds;
        });
        this.activeQuestion = this.questions[this.index];
        this.setAnswers();
    }

    private setAnswers() {
        this.answers = [];
        this.predictionService.getPredictedAnswerByQuestion(this.questions[this.index].id).subscribe(answers => {
                this.answers = answers.map(answer => {
                    return {
                        ...answer,
                        correct: answer.punten === 20
                            ? QuestionCorrect.Full : answer.punten === 10
                                ? QuestionCorrect.Half : QuestionCorrect.None
                    };
                });
            }
        );
    }

    async close() {
        await this.modalController.dismiss({createQuestionstand: false});
    }

    setRound(roundId) {
        this.activeQuestion.roundId = roundId;
    }

    setCorrectness(answer: QuestionPrediction, correctNess: QuestionCorrect) {
        answer.correct = answer.correct === correctNess ? QuestionCorrect.None : correctNess;
    }

    save() {
        forkJoin([
            this.questionService.updateQuestion({
                questionId: this.activeQuestion.id,
                answer: this.activeQuestion.answer,
                roundId: this.activeQuestion.roundId
            }).pipe(first()),
            this.predictionService.updateQuestionPredictions(this.answers.map(answer => {
                return {
                    roundId: this.activeQuestion.roundId,
                    id: answer.id,
                    correct: answer.correct
                };
            })).pipe(first())])
            .subscribe(([one, two]) => {
                this.modalController.dismiss({createQuestionstand: true});
            });
    }
}
