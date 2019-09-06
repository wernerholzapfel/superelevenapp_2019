import {Component, OnDestroy, OnInit} from '@angular/core';
import {getPredictions} from '../../store/competition/competition.reducer';
import {mergeMap, takeUntil} from 'rxjs/operators';
import {Prediction, PredictionType} from '../../models/competition.model';
import {of, Subject} from 'rxjs';
import {IAppState} from '../../store/store';
import {Store} from '@ngrx/store';
import {PredictionService} from '../../services/prediction.service';
import {Match} from '../../models/match.model';
import {ToastService} from '../../services/toast.service';

@Component({
    selector: 'app-matches',
    templateUrl: './matches.page.html',
    styleUrls: ['./matches.page.scss'],
})
export class MatchesPage implements OnInit, OnDestroy {

    public isDirty = false;
    public matches: Match[];
    unsubscribe = new Subject<void>();
    customPopoverOptions: any = {
        header: 'Score',
    };

    constructor(private store: Store<IAppState>,
                private predictionsService: PredictionService,
                private toastService: ToastService) {
    }

    ngOnInit() {
        this.store.select(getPredictions).pipe(takeUntil(this.unsubscribe), mergeMap((predictions: Prediction[]) => {
            if (predictions) {
                return this.predictionsService.getMatches(
                    predictions.find(p => p.predictionType === PredictionType.Matches).id);
            } else {
                return of([]);
            }
        })).pipe(takeUntil(this.unsubscribe))
            .subscribe(matches => {
                this.matches = matches;
            });
    }

    ngOnDestroy(): void {
        this.unsubscribe.next();
        this.unsubscribe.unsubscribe();
    }

}
