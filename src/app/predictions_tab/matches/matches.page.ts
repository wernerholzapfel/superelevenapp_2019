import {Component, OnDestroy, OnInit} from '@angular/core';
import {getPredictions} from '../../store/competition/competition.reducer';
import {switchMap, takeUntil} from 'rxjs/operators';
import {Prediction, PredictionType} from '../../models/competition.model';
import {combineLatest, from, Subject} from 'rxjs';
import {IAppState} from '../../store/store';
import {Store} from '@ngrx/store';
import {PredictionsService} from '../../services/predictions.service';
import {MatchPrediction} from '../../models/match.model';
import {ToastService} from '../../services/toast.service';

@Component({
    selector: 'app-matches',
    templateUrl: './matches.page.html',
    styleUrls: ['./matches.page.scss'],
})
export class MatchesPage implements OnInit, OnDestroy {

    public isDirty = false;
    public matchPredictions: MatchPrediction[];
    unsubscribe = new Subject<void>();

    constructor(private store: Store<IAppState>,
                private predictionsService: PredictionsService,
                private toastService: ToastService) {
    }

    ngOnInit() {
        this.store.select(getPredictions).pipe(takeUntil(this.unsubscribe), switchMap((predictions: Prediction[]) => {
            if (predictions && predictions.length > 0) {
                return combineLatest(
                    this.predictionsService.getMatches(
                        predictions.find(p => p.predictionType === PredictionType.Matches).id),
                    this.predictionsService.getMatchPredictions(
                        predictions.find(p => p.predictionType === PredictionType.Matches).id));
            } else {
                return from([]);
            }
        })).subscribe(
            ([matches, matchPredictions]) => {
                if (matchPredictions && matchPredictions.length > 0) {
                    this.isDirty = false;
                    this.matchPredictions = [...matchPredictions,
                        ...matches.filter(match => {
                            return !matchPredictions.find(mp => mp.match.id === match.id);
                        })
                            .map(i => {
                                return this.transformMatchToPrediction(i);
                            })];
                } else if (!matchPredictions || matchPredictions.length === 0 && matches) {
                    this.matchPredictions = matches.map(i => {
                        return this.transformMatchToPrediction(i);
                    });
                }
            });
    }

    save() {
        console.log('todo save matches');
        this.predictionsService.saveMatchPredictions(this.matchPredictions).subscribe(result => {
            this.matchPredictions = result; // todo store?
            this.toastService.presentToast('Wedstrijden opgeslagen', 'primary');
            this.isDirty = false;
        });
    }

    canISaveForm() {
        return true;
    }

    transformMatchToPrediction(i): MatchPrediction {
        return {homeScore: null, awayScore: null, match: i, competition: i.competition, prediction: i.prediction};
    }

    ngOnDestroy(): void {
        this.unsubscribe.unsubscribe();
    }

}
