import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {IAppState} from '../../store/store';
import {PredictionsService} from '../../services/predictions.service';
import {ToastService} from '../../services/toast.service';
import {getPredictions} from '../../store/competition/competition.reducer';
import {switchMap, takeUntil} from 'rxjs/operators';
import {Prediction, PredictionType} from '../../models/competition.model';
import {combineLatest, from, Subject} from 'rxjs';
import {MatchPrediction} from '../../models/match.model';
import {QuestionPrediction} from '../../models/question.model';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.page.html',
  styleUrls: ['./questions.page.scss'],
})
export class QuestionsPage implements OnInit, OnDestroy {

  public isDirty = false;
  public questionPredictions: QuestionPrediction[];
  unsubscribe = new Subject<void>();

  constructor(private store: Store<IAppState>,
              private predictionsService: PredictionsService,
              private toastService: ToastService) { }

  ngOnInit() {
    this.store.select(getPredictions).pipe(takeUntil(this.unsubscribe), switchMap((predictions: Prediction[]) => {
      if (predictions && predictions.length > 0) {
        return combineLatest(
            this.predictionsService.getQuestions(
                predictions.find(p => p.predictionType === PredictionType.Questions).id),
            this.predictionsService.getQuestionPredictions(
                predictions.find(p => p.predictionType === PredictionType.Questions).id));
      } else {
        return from([]);
      }
    })).subscribe(
        ([questions, questionsPredictions]) => {
          if (questionsPredictions && questionsPredictions.length > 0) {
            this.isDirty = false;
            this.questionPredictions = [...questionsPredictions,
              ...questions.filter(question => {
                return !questionsPredictions.find(mp => mp.question.id === question.id);
              })
                  .map(i => {
                    return this.transformQuestionToPrediction(i);
                  })];
          } else if (!questionsPredictions || questionsPredictions.length === 0 && questions) {
            this.questionPredictions = questions.map(i => {
              return this.transformQuestionToPrediction(i);
            });
          }
        });
  }
  save() {
    this.predictionsService.saveQuestionPredictions(this.questionPredictions).subscribe(result => {
      this.questionPredictions = result; // todo store?
      this.toastService.presentToast('Antwoorden opgeslagen', 'primary');
      this.isDirty = false;
    });
  }

  canISaveForm() {
    // todo logica
    return true;
  }

  transformQuestionToPrediction(i): QuestionPrediction {
    return {answer: null, question: i, competition: i.competition, prediction: i.prediction};
  }

  ngOnDestroy(): void {
    this.unsubscribe.unsubscribe();
  }
}
