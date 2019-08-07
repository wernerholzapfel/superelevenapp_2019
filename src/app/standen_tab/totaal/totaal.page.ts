import {Component, OnDestroy, OnInit} from '@angular/core';
import {getPredictions} from '../../store/competition/competition.reducer';
import {switchMap, takeUntil} from 'rxjs/operators';
import {Prediction, PredictionType} from '../../models/competition.model';
import {combineLatest, from, Subject} from 'rxjs';
import {IAppState} from '../../store/store';
import {Store} from '@ngrx/store';
import {PredictionService} from '../../services/prediction.service';
import {MatchPrediction} from '../../models/match.model';
import {ToastService} from '../../services/toast.service';

@Component({
    selector: 'app-totaal',
    templateUrl: './totaal.page.html',
    styleUrls: ['./totaal.page.scss'],
})
export class TotaalPage implements OnInit, OnDestroy {

    unsubscribe = new Subject<void>();

    constructor(private store: Store<IAppState>,
                private predictionsService: PredictionService,
                private toastService: ToastService) {
    }

    ngOnInit() {
    }

    ngOnDestroy(): void {
        this.unsubscribe.unsubscribe();
    }

}
