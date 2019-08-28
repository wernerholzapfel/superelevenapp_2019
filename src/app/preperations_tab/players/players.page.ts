import {Component, OnDestroy, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
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
import {Teamplayer} from '../../models/teamplayer.model';
import {TeamService} from '../../services/team.service';
import {Team} from '../../models/team.model';
import {PredictionService} from '../../services/prediction.service';

import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

@Component({
    selector: 'app-players',
    templateUrl: './players.page.html',
    styleUrls: ['./players.page.scss'],
})


export class PlayersPage implements OnInit, OnDestroy {

    clubs = [{
        name: 'Ajax',
        formation: [{
            type: 'Attacker',
            players: []
        }, {
            type: 'Midfielder',
            players: []
        }, {
            type: 'Defender',
            players: []
        }, {
            type: 'Goalkeeper',
            players: []
        }]
    }, {
        name: 'PSV',
        formation: [{
            type: 'Attacker',
            players: []
        }, {
            type: 'Midfielder',
            players: []
        }, {
            type: 'Defender',
            players: []
        }, {
            type: 'Goalkeeper',
            players: []
        }]
    }];

    spelers = [
        'Dolberg',
        'Lozana',
        'Take a shower',
        'Check e-mail',
    ];

    competition: any;
    prediction: any;
    formation: Formation[];
    players: Teamplayer[];
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

                }
            });
    }


    drop(event: CdkDragDrop<string[]>) {
        if (event.previousContainer === event.container) {
            moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
        } else {
            transferArrayItem(event.previousContainer.data,
                event.container.data,
                event.previousIndex,
                event.currentIndex);
        }
    }

    save() {
        const blaat: any[] =  this.clubs.map(club => club.formation.map(formation => formation.players.map(
            player => Object.assign({player}, {position: formation.type}))));

        console.log(this.flattenDeep(blaat));
    }

    ngOnDestroy(): void {
        this.unsubscribe.unsubscribe();
    }

    flattenDeep(arr1) {
        return arr1.reduce((acc, val) => Array.isArray(val) ? acc.concat(this.flattenDeep(val)) : acc.concat(val), []);
    }

}
