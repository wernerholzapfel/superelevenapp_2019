import {Component, OnDestroy, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {AddPlayerPage} from './addplayer/add-player-page.component';
import {combineLatest, from, Subject} from 'rxjs';
import {Formation, FormationPlayer} from '../../models/formation.model';
import {ToastService} from '../../services/toast.service';
import {PlayerService} from '../../services/player.service';
import {FormationService} from '../../services/formation.service';
import {getCompetition} from '../../store/competition/competition.reducer';
import {switchMap, takeUntil} from 'rxjs/operators';
import {Competition, PredictionType} from '../../models/competition.model';
import {IAppState} from '../../store/store';
import {Store} from '@ngrx/store';
import {PositionType, TeamPlayer} from '../../models/teamplayer.model';
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
    formation: Formation[];
    players: TeamPlayer[];
    teams: Team[];
    team: FormationPlayer[] = []; // todo check typedefintion
    unsubscribe = new Subject<void>();

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
                return combineLatest(
                    this.playerService.getPlayersByPredictionId(this.prediction.id),
                    this.formationService.getFormation(),
                    this.teamService.getTeams(),
                    this.predictionService.getTeamPrediction(this.prediction.id));
            } else {
                return from([]);
            }
        })).subscribe(
            ([players, formation, teams, predictionTeam]) => {
                if (players && formation && teams) {
                    this.formation = formation;
                    this.players = players;
                    this.teams = teams;

                    // todo predictionTeam ID meegeven op 1 of andere manier.
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
                                {selected: true}) :
                                player;
                        });
                    });

                    this.createTeam();
                }
            });
    }

    save() {
        console.table(this.team);
        this.predictionService.saveTeamPredictions(
            this.team
                .filter(player => player.selected)
                .map(player => Object.assign({},
                    {teamPlayer: {id: player.id}},
                    {roundId: 1}, // todo iets met de roundid op backend ipv frontend?
                    {prediction: {id: this.prediction.id}},
                    {competition: {id: this.competition.id}})))
            .subscribe(result => {
                this.toastService.presentToast('Team opgeslagen', 'primary');
            });
    }


    async addPlayer(request: { formationIndex: number, position: string, player: any }) {
        if (request.player.selected) {
            this.formation[request.formationIndex].players.map(
                p => p.index === request.player.index ?
                    Object.assign(request.player, {player: {firstname: 'Kies'}}, {selected: false}, {team: null}) :
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
                teams: this.teams.filter(team => !this.team.find(pt => pt.player && pt.player.team && pt.player.team.name === team.name)),
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
        // todo create reduce function.
        this.team = Array(...this.formation[0].players,
            ...this.formation[1].players,
            ...this.formation[2].players,
            ...this.formation[3].players,
            ...this.formation[4].players,
            ...this.formation[5].players,
            ...this.formation[6].players,
            ...this.formation[7].players);

        if (this.team.filter(player => player.selected).length === 12) {
            this.toastService.presentToast('Je mag maximaal 11 spelers kiezen, verwijder 1 speler uit je team', 'warning',
                true, 'OK', 3000);
        }
    }

    canISaveForm() {
        const numberOfKeepers = this.team.filter(player => player.selected && player.position === PositionType.Keeper).length;
        const numberOfDefenders = this.team.filter(player => player.selected && player.position === PositionType.Defender).length;

        const numberOfMidfielders = this.team.filter(
            player => player.selected && player.position === PositionType.Midfielder).length;
        const numberOfForwards = this.team.filter(player => player.selected && player.position === PositionType.Forward).length;

        const isTeamComplete: boolean = this.team.filter(player => player.selected).length === 11 &&
            numberOfKeepers === 1 &&
            numberOfDefenders >= 3 &&
            numberOfDefenders <= 4 &&
            numberOfMidfielders >= 3 &&
            numberOfMidfielders <= 4 &&
            numberOfForwards >= 2 &&
            numberOfForwards <= 3;

        this.hideNotSelectedPlayer(isTeamComplete); // todo only when change has been triggered

        // todo change return item
        // return isTeamComplete;
        return true;
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

    ngOnDestroy(): void {
        this.unsubscribe.unsubscribe();
    }

}
