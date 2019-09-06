import {Component, OnDestroy, OnInit} from '@angular/core';
import {RoundService} from '../services/round.service';
import {getCompetition} from '../store/competition/competition.reducer';
import {mergeMap, takeUntil} from 'rxjs/operators';
import {of, Subject} from 'rxjs';
import {IAppState} from '../store/store';
import {Store} from '@ngrx/store';

@Component({
    selector: 'app-resultstab',
    templateUrl: './results_tab.page.html',
    styleUrls: ['./results_tab.page.scss'],
})
export class ResultsTabPage implements OnInit, OnDestroy {


    constructor(private roundService: RoundService,
                private store: Store<IAppState>) {
    }

    unsubscribe = new Subject<void>();

    ngOnInit() {

        this.roundService.getPreviousRound().subscribe(round => {
            this.roundService.previousRoundId$.next(round.id);
        });

        this.store.select(getCompetition).pipe(
            mergeMap(competition => {
                if (competition && competition.id) {
                    return this.roundService.getallRounds(competition.id);
                } else {
                    return of(null);
                }
            }))
            .pipe(takeUntil(this.unsubscribe))
            .subscribe(rounds => {
                this.roundService.allRounds$.next(rounds);
            });

    }

    ngOnDestroy(): void {
        this.unsubscribe.next();
        this.unsubscribe.unsubscribe();
    }
}
