import {Component, OnDestroy, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {AddPlayerPage} from './addplayer/add-player-page.component';
import {combineLatest, from, Observable, of, Subject} from 'rxjs';
import {Formation, FormationPlayer} from '../../models/formation.model';
import {ToastService} from '../../services/toast.service';
import {PlayerService} from '../../services/player.service';
import {FormationService} from '../../services/formation.service';
import {getCompetition} from '../../store/competition/competition.reducer';
import {switchMap, takeUntil} from 'rxjs/operators';
import {Competition, PredictionType} from '../../models/competition.model';
import {IAppState} from '../../store/store';
import {Store} from '@ngrx/store';
import {PositionType, Teamplayer} from '../../models/teamplayer.model';
import {TeamService} from '../../services/team.service';
import {Team} from '../../models/team.model';
import {PredictionService} from '../../services/prediction.service';

@Component({
    selector: 'app-team',
    templateUrl: './team.page.html',
    styleUrls: ['./team.page.scss'],
})


export class TeamPage implements OnInit, OnDestroy {

    competition: any;
    prediction: any;
    isDirty = false;
    formation: Formation[];
    players: Teamplayer[];
    teams: Team[];
    team: FormationPlayer[] = []; // todo check typedefintion
    unsubscribe = new Subject<void>();
    customPopoverOptions: any = {
        header: 'Aanvoerder',
    };
    captainId: FormationPlayer;

    constructor(private store: Store<IAppState>,
                private modalController: ModalController,
                private toastService: ToastService,
                private formationService: FormationService,
                private teamService: TeamService,
                private predictionService: PredictionService,
                private playerService: PlayerService) {
    }

    ngOnInit() {

        this.store.select(getCompetition).pipe(takeUntil(this.unsubscribe), switchMap((competition: Competition) => {
            if (competition && competition.predictions && competition.predictions.length > 0) {
                this.competition = competition;
                this.prediction = competition.predictions.find(p => p.predictionType === PredictionType.Team);
                return combineLatest([
                    this.playerService.getPlayersByPredictionId(this.prediction.id),
                    this.formationService.getFormation(),
                    this.teamService.getTeams(),
                    this.predictionService.getTeamPrediction(this.prediction.id)]);
            } else {
                return from([]);
            }
        })).subscribe(
            ([players, formation, teams, predictionTeam]) => {
                if (players && formation && teams) {
                    this.formation = formation;
                    this.players = players;
                    this.teams = teams;
                    this.captainId = predictionTeam.find(player => player.captain)
                        ? predictionTeam.find(player => player.captain).teamPlayer.player.id
                        : 0;

                    // predictionTeam doorlopen en toevoegen aan juiste formationline positie
                    predictionTeam.map(teamPlayer => {
                        this.formation.find(f => {
                            return f.position === teamPlayer.teamPlayer.position &&
                                f.players.filter(ftp => !ftp.selected).length > 0;
                        }).players.filter(ftp => !ftp.selected).map((player, index) => {
                            return index === 0 ? Object.assign(player,
                                {id: teamPlayer.teamPlayer.id},
                                {player: teamPlayer.teamPlayer.player},
                                {team: teamPlayer.teamPlayer.team},
                                {selected: true},
                                {captain: teamPlayer.captain}) :
                                player;
                        });
                    });

                    this.createTeam();
                }
            });
    }

    save() {
        this.predictionService.saveTeamPredictions(
            this.team
                .filter(player => player.selected)
                .map(player => Object.assign({},
                    {captain: player.captain},
                    {teamPlayer: {id: player.id}},
                    {prediction: {id: this.prediction.id}},
                    {competition: {id: this.competition.id}})))
            .subscribe(result => {
                this.isDirty = false;
                this.toastService.presentToast('Team opgeslagen', 'primary');
            });
    }


    async addPlayer(request: { formationIndex: number, position: string, player: any }) {
        if (request.player.selected) {
            this.isDirty = true;
            this.captainId = request.player.captain ? null : this.captainId;
            this.formation[request.formationIndex].players.map(
                p => p.index === request.player.index ?
                    Object.assign(request.player, {player: {name: 'Kies'}}, {selected: false}, {team: null}, {captain: false}) :
                    Object.assign(p));
            this.createTeam();

            return;
        }
        const modal = await this.modalController.create({
            component: AddPlayerPage,
            componentProps: {
                players: this.players.filter(p => {
                    return this.team.filter(formationPlayer => {
                            return formationPlayer.team &&
                                formationPlayer.team.name &&
                                formationPlayer.team.id === p.team.id;
                        }).length === 0 // todo use id
                        && p.position === request.position;
                }),
                teams: this.teams.filter(team => !this.team.find(pt => pt.player && pt.team && pt.team.id === team.id)),
                formationPlayer: request.player,
                position: request.position,
                formationIndex: request.formationIndex
            }
        });

        modal.onDidDismiss().then((player) => {
                if (player.data !== null && player.data !== undefined) {
                    this.formation.find(
                        f => f.index === player.data.formationIndex).players[player.data.formationPlayer.index] =
                        Object.assign({
                            ...player.data.formationPlayer,
                            selected: true,
                            ...player.data.player
                        });
                }
                this.createTeam();
            }
        );

        return await modal.present();
    }

    createTeam() {
        this.flattenPlayers();

        if (this.team.length === 12) {
            this.toastService.presentToast('Je mag maximaal 11 spelers kiezen, verwijder 1 speler uit je team', 'warning',
                true, 'OK', 3000);
        }
        this.hideNotSelectedPlayer(this.canISaveForm()); // todo only when change has been triggered

    }

    canISaveForm() {
        const numberOfKeepers = this.team.filter(player => player.selected && player.player.position === PositionType.Goalkeeper).length;
        const numberOfDefenders = this.team.filter(player => player.selected && player.player.position === PositionType.Defender).length;

        const numberOfMidfielders = this.team.filter(
            player => player.selected && player.player.position === PositionType.Midfielder).length;
        const numberOfForwards = this.team.filter(player => player.selected && player.player.position === PositionType.Attacker).length;

        const isTeamComplete: boolean = this.team.filter(player => player.selected).length === 11 &&
            numberOfKeepers === 1 &&
            numberOfDefenders >= 3 &&
            numberOfDefenders <= 4 &&
            numberOfMidfielders >= 3 &&
            numberOfMidfielders <= 4 &&
            numberOfForwards >= 2 &&
            numberOfForwards <= 3;

        return isTeamComplete;
    }

    flattenPlayers() {
        // todo create reduce function.
        this.team = this.formation && this.formation.length > 0 ? Array(...this.formation[0].players,
            ...this.formation[1].players,
            ...this.formation[2].players,
            ...this.formation[3].players,
            ...this.formation[4].players,
            ...this.formation[5].players,
            ...this.formation[6].players,
            ...this.formation[7].players).filter(player => player.selected) : [];
    }

    setCaptain(event) {
        this.captainId = event.detail.value;
        this.formation = this.formation.map(line => {
            return {
                ...line,
                players: line.players.map(player => {
                    if (player.player.id === event.detail.value) {
                        return {
                            ...player,
                            captain: true
                        };
                    } else {
                        return {
                            ...player,
                            captain: false
                        };
                    }
                })
            };
        });
        this.flattenPlayers();
    }

    hideNotSelectedPlayer(teamCompleted: boolean) {
        if (this.formation) {
            this.formation.map(f => f.players.map(pl => {
                return !teamCompleted ? Object.assign(pl, {hide: false}) :
                    pl.selected && f.players.filter(p => p.selected).length === 1 ?
                        Object.assign(pl, {hide: false}, {class: ['text-center']}) :
                        Object.assign(pl, {hide: !pl.selected}, {class: pl.initialClass});
            }));
        }
    }

    canDeactivate(): Observable<boolean> | Promise<boolean> {
        if (this.isDirty) {
            return this.toastService.presentAlertConfirm().then(alertResponse => {
                return alertResponse;
            });
        } else {
            return of(true);
        }
    }


    ngOnDestroy(): void {
        this.unsubscribe.unsubscribe();
    }

}
