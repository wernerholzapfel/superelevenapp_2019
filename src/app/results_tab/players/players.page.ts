import {Component, OnDestroy, OnInit} from '@angular/core';
import {IonRouterOutlet, ModalController} from '@ionic/angular';
import {BehaviorSubject, combineLatest, forkJoin, of, Subject} from 'rxjs';
import {Formation, FormationPlayer} from '../../models/formation.model';
import {ToastService} from '../../services/toast.service';
import {PlayerService} from '../../services/player.service';
import {FormationService} from '../../services/formation.service';
import {getCompetition} from '../../store/competition/competition.reducer';
import {first, mergeMap, takeUntil} from 'rxjs/operators';
import {IAppState} from '../../store/store';
import {Store} from '@ngrx/store';
import {TeamplayerResponse} from '../../models/teamplayer.model';
import {TeamService} from '../../services/team.service';
import {PredictionService} from '../../services/prediction.service';
import {PlayerScoreformComponent} from './playerScoreform/player-scoreform.component';
import {ScoreformUiService} from '../../services/scoreform-ui.service';
import {RankingTeam, Round} from '../../models/prediction.model';
import {LoaderService} from '../../services/loader.service';
import {PredictionType} from '../../models/competition.model';
import {RoundService} from '../../services/round.service';
import {StandenService} from '../../services/standen.service';
import {StatsService} from '../../services/stats.service';

@Component({
    selector: 'app-players',
    templateUrl: './players.page.html',
    styleUrls: ['./players.page.scss'],
})


export class PlayersPage implements OnInit, OnDestroy {

    competition: any;
    prediction: any;
    formation: Formation[];
    players: TeamplayerResponse[];
    teams: RankingTeam[];
    team: FormationPlayer[] = []; // todo check typedefintion
    activeRound: string;
    rounds: Round[];
    searchTerm$: BehaviorSubject<string> = new BehaviorSubject('');
    activeRoundId$: BehaviorSubject<string> = new BehaviorSubject('');

    unsubscribe = new Subject<void>();
    isLoading: Subject<boolean> = this.loaderService.isLoading;

    constructor(private store: Store<IAppState>,
                private modalController: ModalController,
                private toastService: ToastService,
                private formationService: FormationService,
                private teamService: TeamService,
                private predictionService: PredictionService,
                private roundService: RoundService,
                private playerService: PlayerService,
                private scoreformUiService: ScoreformUiService,
                private loaderService: LoaderService,
                private standenService: StandenService,
                private statsService: StatsService,
                private routerOutlet: IonRouterOutlet,
    ) {
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
                    return combineLatest([this.searchTerm$,
                        this.playerService.getPlayersScore(this.prediction.id, activeRound),
                        this.roundService.getallRounds(this.competition.id)]);
                } else {
                    return of([]);
                }
            }))
            .pipe(takeUntil(this.unsubscribe))
            .subscribe(([searchTerm, players, rounds]) => {
                if (players && players.length > 0) {
                    this.scoreformUiService.scoreformPlayersList$.next(
                        this.scoreformUiService.filterPlayers(searchTerm, null, players));
                    this.rounds = rounds;
                }
            });

        this.scoreformUiService.scoreformPlayersList$
            .pipe(takeUntil(this.unsubscribe))
            .subscribe(players => {
                    this.players = players;
                }
            );
    }


    search($event) {
        this.searchTerm$.next($event.detail.value);
    }

    async openScoreForm(index) {
        const modal = await this.modalController.create({
            component: PlayerScoreformComponent,
            swipeToClose: true,
            presentingElement: this.routerOutlet.nativeEl,
            componentProps: {
                index,
                roundId: this.activeRoundId$.getValue(),
                competition: this.competition,
                prediction: this.prediction,
            }
        });

        modal.onDidDismiss().then((event) => {
            if (event.data) {
            }
        });

        return await modal.present();
    }

    roundChange(roundId: string) {
        // reset teamlist when new round is selected
        this.scoreformUiService.scoreformTeamList$.next([]);
        this.activeRoundId$.next(roundId);

    }

    updatePlayerStand() {
        forkJoin([
            this.standenService.createRoundTeamStand(this.competition.id, this.prediction.id, this.activeRound).pipe(first()),
            this.standenService.createTeamStand(this.competition.id, this.prediction.id).pipe(first()),
            this.statsService.createStatsForRound(this.competition.id, this.prediction.id, this.activeRound).pipe(first()),
            this.statsService.createStats(this.competition.id, this.prediction.id).pipe(first()),
            this.standenService.createTotalStand(this.competition.id).pipe(first())
        ])
            .subscribe(([res1, res2, res3, res4, res5]) => {
                this.toastService.presentToast('Standen en statistieken bijgewerkt');
            }, error => {
                this.toastService.presentToast('er is iets misgegaan bij het opslaan', 'warning');
            });
    }

    ngOnDestroy(): void {
        this.unsubscribe.next();
        this.unsubscribe.unsubscribe();
    }
}
