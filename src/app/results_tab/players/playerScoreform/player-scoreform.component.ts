import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {IonContent, ModalController, NavParams} from '@ionic/angular';
import {PositionType, TeamplayerResponse} from '../../../models/teamplayer.model';
import {ScoreformUiService} from '../../../services/scoreform-ui.service';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {ResultScoreService} from '../../../services/result-score.service';
import {ToastService} from '../../../services/toast.service';
import {Competition, Prediction} from '../../../models/competition.model';

@Component({
    selector: 'app-playerscoreform',
    templateUrl: './player-scoreform.component.html',
    styleUrls: ['./player-scoreform.component.scss'],
})
export class PlayerScoreformComponent implements OnInit, OnDestroy {

    @ViewChild(IonContent, {static: false}) content: IonContent;

    unsubscribe = new Subject<void>();

    player: TeamplayerResponse;
    players: TeamplayerResponse[];
    index: number;
    positionType: typeof PositionType = PositionType;
    teams: { id: string, win: boolean, draw: boolean, cleansheet: boolean }[] = [];
    roundId: string;
    competition: Competition;
    prediction: Prediction;

    constructor(
        private modalController: ModalController,
        private navParams: NavParams,
        private scoreformUiService: ScoreformUiService,
        private toastService: ToastService,
        private teamplayerScoresService: ResultScoreService
    ) {
    }

    ngOnInit() {
        this.scoreformUiService.scoreformPlayersList$.pipe(takeUntil(this.unsubscribe)).subscribe(players => {
                this.players = players;
                this.index = this.navParams.data.index;
                this.competition = this.navParams.data.competition;
                this.prediction = this.navParams.data.prediction;
                this.roundId = this.navParams.data.roundId;
                this.player = players[this.index];
            }
        );

        this.scoreformUiService.scoreformTeamList$.pipe(takeUntil(this.unsubscribe)).subscribe(teams => {
                this.teams = teams;
            }
        );
    }

    async updatePlayer() {
        this.savePlayer();
        await this.updateTeam();
        await this.scoreformUiService.scoreformPlayersList$.next(this.players);
        await this.modalController.dismiss();
    }

    nextPlayer() {
        this.savePlayer();
        this.updateTeam();
        this.index++;
        this.player = Object.assign({}, this.players[this.index]);
        this.content.scrollToTop();

    }

    previousPlayer() {
        this.savePlayer();
        this.updateTeam();
        this.index--;
        this.player = Object.assign({}, this.players[this.index]);
        this.content.scrollToTop();
    }

    private savePlayer() {
        if (this.player.teamplayerscores.played) {
            this.teamplayerScoresService.postTeamplayerScore({
                ...(this.player.teamplayerscores.id ? {id: this.player.teamplayerscores.id} : {}),
                teamPlayer: {
                    id: this.player.id
                },
                competition: {
                    id: this.competition.id
                },
                prediction: {
                    id: this.prediction.id
                },
                round: {
                    id: this.roundId
                },
                played: !!this.player.teamplayerscores.played,
                win: !!this.player.teamplayerscores.win,
                draw: !!this.player.teamplayerscores.draw,
                cleansheet: !!this.player.teamplayerscores.cleansheet,
                yellow: !!this.player.teamplayerscores.yellow,
                secondyellow: !!this.player.teamplayerscores.secondyellow,
                red: !!this.player.teamplayerscores.red,
                goals: this.player.teamplayerscores.goals ? this.player.teamplayerscores.goals : 0,
                assists: this.player.teamplayerscores.assists ? this.player.teamplayerscores.assists : 0,
                penaltymissed: this.player.teamplayerscores.penaltymissed ? this.player.teamplayerscores.penaltymissed : 0,
                penaltystopped: this.player.teamplayerscores.penaltystopped ? this.player.teamplayerscores.penaltystopped : 0,
                owngoal: this.player.teamplayerscores.owngoal ? this.player.teamplayerscores.owngoal : 0
            }).subscribe(response => {

                // todo update player
            }, error => {
                this.toastService.presentToast(error.error, 'warning');
            });
        }
    }

    private updateTeam() {
        if (this.player.teamplayerscores.played) {
            if (!this.teams.find(team => team.id === this.player.team.id)) {
                // team nog niet bekend, toevoegen
                this.scoreformUiService.scoreformTeamList$.next([...this.teams, {
                    id: this.player.team.id,
                    cleansheet: this.player.teamplayerscores.cleansheet,
                    win: this.player.teamplayerscores.win,
                    draw: this.player.teamplayerscores.draw
                }]);
            } else {
                // team bekend immutable update
                this.scoreformUiService.scoreformTeamList$.next(this.teams.map(team => {
                    if (team.id === this.player.team.id) {
                        return {
                            ...team,
                            win: this.player.teamplayerscores.win,
                            draw: this.player.teamplayerscores.draw,
                            cleansheet: this.player.teamplayerscores.cleansheet,
                        };
                    } else {
                        return team;
                    }
                }));
            }
        }
    }

    setTeamProperties($event, scoreType: string) {
        const playersTeam = this.teams.find(team => team.id === this.player.team.id);
        if (!playersTeam) {
            this.teams = [...this.teams, {
                id: this.player.team.id,
                cleansheet: this.player.teamplayerscores.cleansheet,
                win: this.player.teamplayerscores.win,
                draw: this.player.teamplayerscores.draw
            }];
        }

        if ($event.detail.checked && playersTeam) {
            this.player.teamplayerscores = Object.assign(this.player.teamplayerscores, {
                win: playersTeam.win,
                draw: playersTeam.draw,
                cleansheet: playersTeam.cleansheet
            });
        } else {
            this.player.teamplayerscores = Object.assign(this.player.teamplayerscores, {
                win: null,
                draw: null,
                cleansheet: null
            });
        }
    }

    ngOnDestroy(): void {
        this.unsubscribe.next();
        this.unsubscribe.complete();
    }
}
