import {Component, OnDestroy, OnInit} from '@angular/core';
import {StatsService} from '../services/stats.service';
import {Store} from '@ngrx/store';
import {IAppState} from '../store/store';
import {getCompetition} from '../store/competition/competition.reducer';
import {mergeMap, takeUntil} from 'rxjs/operators';
import {PredictionType} from '../models/competition.model';
import {BehaviorSubject, combineLatest, of, Subject} from 'rxjs';
import {UiService} from '../ui.service';
import {RoundService} from '../services/round.service';
import {ScoreformUiService} from '../services/scoreform-ui.service';

@Component({
    selector: 'app-stats-tab',
    templateUrl: './stats-tab.page.html',
    styleUrls: ['./stats-tab.page.scss'],
})
export class StatsTabPage implements OnInit, OnDestroy {
    unsubscribe = new Subject<void>();
    players: any[];
    competition: any;
    prediction: any;
    activeRound: string;
    activeRoundId$: BehaviorSubject<string> = new BehaviorSubject('');
    searchTerm$: BehaviorSubject<string> = new BehaviorSubject('');

    constructor(private roundService: RoundService,
                private statsService: StatsService,
                private store: Store<IAppState>,
                private uiService: UiService,
                private scoreformUiService: ScoreformUiService) {
    }

    ngOnInit() {

        this.store.select(getCompetition).pipe(
            mergeMap(competition => {
                if (competition && competition.predictions && competition.predictions.length > 0) {
                    this.competition = competition;
                    this.prediction = competition.predictions.find(p => p.predictionType === PredictionType.Team);
                    return this.activeRoundId$;
                } else {
                    return of('');
                }
            }),
            mergeMap(activeRound => {
                if (activeRound) {
                    this.activeRound = activeRound;
                    return activeRound.toLowerCase() === 'totaal' ?
                        combineLatest([this.searchTerm$,
                            this.statsService.getStats(this.prediction.id)]) :
                        combineLatest([this.searchTerm$,
                            this.statsService.getStatsForRound(this.prediction.id, activeRound)]);
                } else {
                    return of([]);
                }
            }))
            .pipe(takeUntil(this.unsubscribe))
            .subscribe(([searchTerm, players]) => {
                if (players && players.length > 0) {
                    this.uiService.stats$.next(
                        this.scoreformUiService.filterPlayers(searchTerm, null, players));
                }
            });

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

    search($event) {
        this.searchTerm$.next($event.detail.value);
    }

    roundChange(roundId: string) {
        this.activeRoundId$.next(roundId);
    }

    ngOnDestroy(): void {
        this.unsubscribe.next();
        this.unsubscribe.unsubscribe();
    }
}
