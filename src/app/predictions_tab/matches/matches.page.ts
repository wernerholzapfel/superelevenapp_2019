import {Component, OnDestroy, OnInit} from '@angular/core';
import {getPredictions, isRegistrationOpen} from '../../store/competition/competition.reducer';
import {switchMap, takeUntil} from 'rxjs/operators';
import {Prediction, PredictionType} from '../../models/competition.model';
import {combineLatest, from, Observable, of, Subject} from 'rxjs';
import {IAppState} from '../../store/store';
import {Store} from '@ngrx/store';
import {PredictionService} from '../../services/prediction.service';
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

    public isRegistrationOpen$: Observable<boolean>;

    constructor(private store: Store<IAppState>,
                private predictionsService: PredictionService,
                private toastService: ToastService) {
    }

    // todo create form

    ngOnInit() {
        this.isRegistrationOpen$ = this.store.select(isRegistrationOpen).pipe(takeUntil(this.unsubscribe));

        this.store.select(getPredictions).pipe(takeUntil(this.unsubscribe), switchMap((predictions: Prediction[]) => {
            if (predictions && predictions.length > 0) {
                return combineLatest([
                    this.predictionsService.getMatches(
                        predictions.find(p => p.predictionType === PredictionType.Matches).id),
                    this.predictionsService.getMatchPredictions(
                        predictions.find(p => p.predictionType === PredictionType.Matches).id)]);
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

    canDeactivate(): Observable<boolean> | Promise<boolean> {
        if (this.isDirty) {
            return this.toastService.presentAlertConfirm().then(alertResponse => {
                return alertResponse;
            });
        } else {
            return of(true);
        }
    }


    ngOnDestroy(): void {
        this.unsubscribe.unsubscribe();
    }

}
