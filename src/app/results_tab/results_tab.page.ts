import {Component, OnDestroy, OnInit} from '@angular/core';
import {RoundService} from '../services/round.service';
import {getCompetition} from '../store/competition/competition.reducer';
import {mergeMap, takeUntil} from 'rxjs/operators';
import {of, Subject} from 'rxjs';
import {IAppState} from '../store/store';
import {Store} from '@ngrx/store';
import {StandenService} from '../services/standen.service';

@Component({
    selector: 'app-resultstab',
    templateUrl: './results_tab.page.html',
    styleUrls: ['./results_tab.page.scss'],
})
export class ResultsTabPage implements OnInit, OnDestroy {


    constructor(private roundService: RoundService,
                private standenService: StandenService,
                private store: Store<IAppState>) {
    }

    unsubscribe = new Subject<void>();

    ngOnInit() {

        this.roundService.getPreviousRound().subscribe(round => {
            this.roundService.previousRoundId$.next(round.id);
        });
    }

    ngOnDestroy(): void {
        this.unsubscribe.next();
        this.unsubscribe.unsubscribe();
    }
}
