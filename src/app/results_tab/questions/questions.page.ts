import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {IAppState} from '../../store/store';
import {PredictionService} from '../../services/prediction.service';
import {ToastService} from '../../services/toast.service';
import {getCompetition} from '../../store/competition/competition.reducer';
import {first, mergeMap, takeUntil} from 'rxjs/operators';
import {Competition, Prediction, PredictionType} from '../../models/competition.model';
import {concat, forkJoin, from, Subject} from 'rxjs';
import {QuestionPrediction} from '../../models/question.model';
import {ModalController} from '@ionic/angular';
import {QuestionResultFormComponent} from '../../components/question-result-form/question-result-form.component';
import {StandenService} from '../../services/standen.service';

@Component({
    selector: 'app-questions',
    templateUrl: './questions.page.html',
    styleUrls: ['./questions.page.scss'],
})
export class QuestionsPage implements OnInit, OnDestroy {

    public isDirty = false;
    public questions: QuestionPrediction[];
    unsubscribe = new Subject<void>();
    public competition: Competition;
    public prediction: Prediction;

    constructor(private store: Store<IAppState>,
                private predictionsService: PredictionService,
                private modalController: ModalController,
                private standenService: StandenService,
                private toastService: ToastService) {
    }

    ngOnInit() {
        this.store.select(getCompetition).pipe(mergeMap((competition: Competition) => {
            this.competition = competition;
            if (competition.predictions && competition.predictions.length > 0) {
                this.prediction = competition.predictions.find(pred => pred.predictionType === PredictionType.Questions);
                return this.predictionsService.getQuestions(this.prediction.id);
            } else {
                return from([]);
            }
        })).pipe(takeUntil(this.unsubscribe))
            .subscribe(questions => {
                this.questions = questions;
            });
    }

    async openDetails(index) {
        const modal = await this.modalController.create({
            component: QuestionResultFormComponent,
            componentProps: {
                index,
                questions: this.questions,
            }
        });

        modal.onDidDismiss().then((event) => {
            if (event.data.createQuestionstand) {
                this.save();
            } else {
                this.save();
            }
        });

        return await modal.present();
    }

    save() {
        forkJoin([
            this.standenService.createQuestionStand(this.competition.id, this.prediction.id).pipe(first()),
            this.standenService.createTotalStand(this.competition.id).pipe(first())
        ])
            .subscribe(([res1, res2]) => {
                this.toastService.presentToast('Standen bijgewerkt');
            }, error => {
                this.toastService.presentToast('er is iets misgegaan bij het opslaan', 'warning');
            });
    }

    ngOnDestroy(): void {
        this.unsubscribe.next();
        this.unsubscribe.unsubscribe();
    }
}
