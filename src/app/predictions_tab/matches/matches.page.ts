import {Component, OnInit} from '@angular/core';
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
export class MatchesPage implements OnInit {

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
                    this.predictionsService.getMatchesPrediction(
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

    // let arr1 = [1,2,3,4,5];
    // let arr2 = [3,4,5,6];
    // let result = [...new Set([...arr1, ...arr2])];
    // console.log(result);
    save() {
        console.log('todo save matches');
        this.predictionsService.saveMatchesPredictions(this.matchPredictions).subscribe(result => {
            this.matchPredictions = result; // todo store?
            this.toastService.presentToast('Wedstrijden opgeslagen', 'primary');
            this.isDirty = false;
        });
    }

    canISaveForm() {
        return true;
    }

    transformMatchToPrediction(i): MatchPrediction {
        console.log(i);
        console.log({homeScore: null, awayScore: null, match: i, competition: i.competition, prediction: i.prediction});
        return {homeScore: null, awayScore: null, match: i, competition: i.competition, prediction: i.prediction};
    }
}
