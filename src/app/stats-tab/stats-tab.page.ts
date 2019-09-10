import {Component, OnDestroy, OnInit} from '@angular/core';
import {StatsService} from '../services/stats.service';
import {Store} from '@ngrx/store';
import {IAppState} from '../store/store';
import {getCompetition} from '../store/competition/competition.reducer';
import {mergeMap, takeUntil} from 'rxjs/operators';
import {PredictionType} from '../models/competition.model';
import {of, Subject} from 'rxjs';
import {UiService} from '../ui.service';

@Component({
    selector: 'app-stats-tab',
    templateUrl: './stats-tab.page.html',
    styleUrls: ['./stats-tab.page.scss'],
})
export class StatsTabPage implements OnInit, OnDestroy {
    unsubscribe = new Subject<void>();
    players: any[];

    constructor(private statsService: StatsService, private store: Store<IAppState>, private uiService: UiService) {
    }

    ngOnInit() {

        this.store.select(getCompetition).pipe(takeUntil(this.unsubscribe), mergeMap(competition => {
            if (competition && competition.predictions) {
                return this.statsService.getStats(
                    competition.predictions.find(pr => pr.predictionType === PredictionType.Team).id);
            } else {
                return of([]);
            }
        }))
            .pipe(takeUntil(this.unsubscribe))
            .subscribe(stats => {
                this.uiService.stats$.next(stats);
            });
    }

    ngOnDestroy(): void {
        this.unsubscribe.next();
        this.unsubscribe.unsubscribe();
    }
}
