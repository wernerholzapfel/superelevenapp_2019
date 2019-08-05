import {Component, OnDestroy, OnInit} from '@angular/core';
import {ModalController, NavParams} from '@ionic/angular';
import {PositionType, TeamPlayer} from '../../../models/teamplayer.model';
import {ScoreformUiService} from '../../../services/scoreform-ui.service';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';

@Component({
    selector: 'app-playerscoreform',
    templateUrl: './player-scoreform.component.html',
    styleUrls: ['./player-scoreform.component.scss'],
})
export class PlayerScoreformComponent implements OnInit, OnDestroy {

    unsubscribe = new Subject<void>();

    player: TeamPlayer;
    players: TeamPlayer[];
    index: number;
    PositionType: typeof PositionType = PositionType;
    teams: { id: string, win: boolean, draw: boolean, cleansheet: boolean }[] = [];

    constructor(
        private modalController: ModalController,
        private navParams: NavParams,
        private scoreformUiService: ScoreformUiService
    ) {
    }

    ngOnInit() {
        this.scoreformUiService.scoreformPlayersList$.pipe(takeUntil(this.unsubscribe)).subscribe(players => {
                this.players = players;
                this.index = this.navParams.data.index;
                this.player = players[this.index];
            }
        );

        this.scoreformUiService.scoreformTeamList$.pipe(takeUntil(this.unsubscribe)).subscribe(teams => {
                this.teams = teams;
            }
        );
    }

    async updatePlayer() {
        await this.updateTeam();
        await this.scoreformUiService.scoreformPlayersList$.next(this.players);
        await this.modalController.dismiss();
    }

    nextPlayer() {
        this.updateTeam();
        this.index++;
        this.player = Object.assign({}, this.players[this.index]);
    }

    previousPlayer() {
        this.updateTeam();
        this.index--;
        this.player = Object.assign({}, this.players[this.index]);
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
