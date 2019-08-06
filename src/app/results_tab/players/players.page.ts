import {Component, OnDestroy, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {BehaviorSubject, combineLatest, from, Subject} from 'rxjs';
import {Formation, FormationPlayer} from '../../models/formation.model';
import {ToastService} from '../../services/toast.service';
import {PlayerService} from '../../services/player.service';
import {FormationService} from '../../services/formation.service';
import {getCompetition} from '../../store/competition/competition.reducer';
import {switchMap, takeUntil} from 'rxjs/operators';
import {Competition, PredictionType} from '../../models/competition.model';
import {IAppState} from '../../store/store';
import {Store} from '@ngrx/store';
import {Teamplayer, TeamplayerResponse} from '../../models/teamplayer.model';
import {TeamService} from '../../services/team.service';
import {Team} from '../../models/team.model';
import {PredictionService} from '../../services/prediction.service';
import {PlayerScoreformComponent} from './playerScoreform/player-scoreform.component';
import {ScoreformUiService} from '../../services/scoreform-ui.service';

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
    teams: Team[];
    team: FormationPlayer[] = []; // todo check typedefintion
    searchTerm$: BehaviorSubject<string> = new BehaviorSubject('');

    unsubscribe = new Subject<void>();

    constructor(private store: Store<IAppState>,
                private modalController: ModalController,
                private toastService: ToastService,
                private formationService: FormationService,
                private teamService: TeamService,
                private predictionService: PredictionService,
                private playerService: PlayerService,
                private scoreformUiService: ScoreformUiService
    ) {
    }

    ngOnInit() {

        this.store.select(getCompetition).pipe(takeUntil(this.unsubscribe), switchMap((competition: Competition) => {
            if (competition && competition.predictions && competition.predictions.length > 0) {
                this.competition = competition;
                this.prediction = competition.predictions.find(p => p.predictionType === PredictionType.Team);
                return combineLatest(
                    this.playerService.getPlayersScore(this.prediction.id, 'b0fde487-fcdf-4e2a-ace3-b4dd84511774'),
                    this.teamService.getTeams(),
                    this.searchTerm$);
            } else {
                return from([]);
            }
        })).subscribe(
            ([players, teams, searchTerm]) => {
                if (players && teams) {
                    this.scoreformUiService.scoreformPlayersList$.next(this.scoreformUiService.filterPlayers(searchTerm, null, players));
                    this.teams = teams;
                }
            });

        this.scoreformUiService.scoreformPlayersList$.pipe(takeUntil(this.unsubscribe)).subscribe(players => {
                this.players = players;
            }
        );

    }


    search($event) {
        this.searchTerm$.next($event.detail.value);
    }

    save() {
        console.log('save button geklickec');
    }

    async openScoreForm(index) {
        const modal = await this.modalController.create({
            component: PlayerScoreformComponent,
            componentProps: {
                index
            }
        });

        modal.onDidDismiss().then((event) => {
            if (event.data) {
                // todo player updaten
                // this.players = this.players.map((item) => {
                //     if (item.id !== event.data.player.id) {
                //         return item;
                //     }
                //     // Otherwise, this is the one we want - return an updated value
                //     return {
                //         ...item,
                //         scoreform: {played: true}
                //     };
                // });
            }
        });

        return await modal.present();
    }

    ngOnDestroy(): void {
        this.unsubscribe.unsubscribe();
    }
}
