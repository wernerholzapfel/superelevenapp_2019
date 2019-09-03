import {Component, OnDestroy, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {BehaviorSubject, combineLatest, of, Subject} from 'rxjs';
import {Formation, FormationPlayer} from '../../models/formation.model';
import {ToastService} from '../../services/toast.service';
import {PlayerService} from '../../services/player.service';
import {FormationService} from '../../services/formation.service';
import {getCompetition} from '../../store/competition/competition.reducer';
import {mergeMap, takeUntil} from 'rxjs/operators';
import {IAppState} from '../../store/store';
import {Store} from '@ngrx/store';
import {TeamplayerResponse} from '../../models/teamplayer.model';
import {TeamService} from '../../services/team.service';
import {PredictionService} from '../../services/prediction.service';
import {PlayerScoreformComponent} from './playerScoreform/player-scoreform.component';
import {ScoreformUiService} from '../../services/scoreform-ui.service';
import {RankingTeam} from '../../models/prediction.model';
import {LoaderService} from '../../services/loader.service';
import {PredictionType} from '../../models/competition.model';
import {RoundService} from '../../services/round.service';

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
    ) {
    }

    ngOnInit() {


        // getcompetition  ->
        // prediction nodig competition ->
        // ronde nodig competition ->
        // getplayersscore nodig prediction en round ->
        // filter players nodig spelers, searchterm

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
                        this.playerService.getPlayersScore(this.prediction.id, activeRound)]);
                } else {
                    return of([]);
                }
            }))
            .subscribe(([searchTerm, players]) => {
                if (players && players.length > 0) {
                    this.scoreformUiService.scoreformPlayersList$.next(
                        this.scoreformUiService.filterPlayers(searchTerm, null, players));
                }
            });

        this.scoreformUiService.scoreformPlayersList$
            .pipe(takeUntil(this.unsubscribe))
            .subscribe(players => {
                    this.players = players.filter(player => player.isSelected);
                }
            );
    }


    search($event) {
        this.searchTerm$.next($event.detail.value);
    }

    async openScoreForm(index) {
        const modal = await this.modalController.create({
            component: PlayerScoreformComponent,
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

    ngOnDestroy(): void {
        this.unsubscribe.unsubscribe();
    }
}
