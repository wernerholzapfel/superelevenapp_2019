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
import {Round} from '../models/prediction.model';
import {AngularFireDatabase} from '@angular/fire/database';

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
    rounds: Round[];
    activeRoundId$: BehaviorSubject<string> = new BehaviorSubject('');
    searchTerm$: BehaviorSubject<string> = new BehaviorSubject('');

    constructor(private roundService: RoundService,
                private db: AngularFireDatabase,
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
                            this.db.list<any>(`${this.competition.id}/statistieken/${this.prediction.id}/totaal`).valueChanges(),
                        ]) :
                        combineLatest([this.searchTerm$,
                            this.db.list<any>(`${this.competition.id}/statistieken/${this.prediction.id}/${activeRound}`).valueChanges(),
                        ]);
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

        this.roundService.getPreviousRound()
            .pipe(takeUntil(this.unsubscribe))
            .subscribe(round => {
            this.roundService.previousRoundId$.next(round.id);
        });

        this.roundService.getPlayedRounds()
            .pipe(takeUntil(this.unsubscribe))
            .subscribe(rounds => {
                this.rounds = rounds;
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
