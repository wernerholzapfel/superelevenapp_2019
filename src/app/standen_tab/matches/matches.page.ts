import {Component, OnDestroy, OnInit} from '@angular/core';
import {StandenService} from '../../services/standen.service';
import {getCompetition} from '../../store/competition/competition.reducer';
import {mergeMap, takeUntil} from 'rxjs/operators';
import {IAppState} from '../../store/store';
import {Store} from '@ngrx/store';
import {PredictionType} from '../../models/competition.model';
import {of, Subject} from 'rxjs';

@Component({
    selector: 'app-matches',
    templateUrl: './matches.page.html',
    styleUrls: ['./matches.page.scss'],
})
export class MatchesPage implements OnInit, OnDestroy {
    unsubscribe = new Subject<void>();
    stand: any[];
    constructor(private standenService: StandenService, private store: Store<IAppState>) {
    }

    ngOnInit() {
        this.store.select(getCompetition).pipe(takeUntil(this.unsubscribe), mergeMap(competition => {
            if (competition && competition.predictions) {
                return this.standenService.getMatchesStand(
                    competition.predictions.find(pr => pr.predictionType === PredictionType.Matches).id);
            } else {
                return of([]);
            }})
)
            .subscribe(matches => {
                this.stand = matches;
                console.table(matches);
            });
    }

    ngOnDestroy(): void {
        this.unsubscribe.unsubscribe();
    }

}
