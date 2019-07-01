import {Component, OnDestroy, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {AddPlayerPage} from './addplayer/add-player-page.component';
import {Subject} from 'rxjs';
import {Formation} from '../../models/formation.model';
import {ToastService} from '../../services/toast.service';

@Component({
    selector: 'app-team',
    templateUrl: './team.page.html',
    styleUrls: ['./team.page.scss'],
})


export class TeamPage implements OnInit, OnDestroy {

    formation: Formation[] = [
        {
            position: 'forward',
            class: ['forward', 'text-center', 'justify-content-center'],
            disable: false,
            hide: false,
            index: 0,
            players: [{
                index: 0,
                name: 'Kies',
                selected: false,
                hide: false,
                initialClass: ['text-center'],
                class: ['text-center']
            }]
        },
        {
            position: 'forward',
            class: ['forward', 'formation-line'],
            disable: false,
            hide: false,
            index: 1,
            players: [{
                index: 0, name: 'Kies',
                selected: false,
                hide: false,
                initialClass: ['text-left'],
                class: ['text-left']
            }, {
                index: 1, name: 'Kies',
                selected: false,
                hide: false,
                initialClass: ['text-right'],
                class: ['text-right']
            }]
        },
        {
            position: 'midfielder',
            class: ['midfielder'],
            disable: false,
            hide: false,
            index: 2,
            players: [{
                index: 0, name: 'Kies',
                selected: false,
                hide: false,
                initialClass: ['text-center'],
                class: ['text-center'],
            }]
        },
        {
            position: 'midfielder',
            class: [],
            disable: false,
            hide: false,
            index: 3,
            players: [{
                index: 0, name: 'Kies',
                selected: false,
                hide: false,
                initialClass: ['text-left'],
                class: ['text-left'],
            }, {
                index: 1,
                name: 'Kies',
                selected: false,
                hide: false,
                initialClass: ['text-right'],
                class: ['text-right'],
            }]
        },
        {
            position: 'midfielder',
            class: ['formation-line'],
            disable: false,
            hide: false,
            index: 4,
            players: [{
                index: 0, name: 'Kies',
                selected: false,
                hide: false,
                initialClass: ['text-center'],
                class: ['text-center'],
            }]
        },
        {
            position: 'defender',
            class: [],
            disable: false,
            hide: false,
            index: 5,
            players: [{
                index: 0, name: 'Kies',
                selected: false,
                hide: false,
                initialClass: ['text-left'],
                class: ['text-left'],
            }, {
                index: 1,
                name: 'Kies',
                selected: false,
                hide: false,
                initialClass: ['text-right'],
                class: ['text-right']
            }]
        },
        {
            position: 'defender',
            class: ['formation-line'],
            disable: false,
            hide: false,
            index: 6,
            players: [{
                index: 0, name: 'Kies',
                selected: false,
                hide: false,
                initialClass: ['text-right'],
                class: ['text-right'],
            }, {
                index: 1,
                name: 'Kies',
                selected: false,
                hide: false,
                initialClass: ['text-left'],
                class: ['text-left'],
            }]
        },
        {
            position: 'keeper',
            class: ['forward', 'text.center'],
            disable: false,
            hide: false,
            index: 7,
            players: [{
                index: 0, name: 'Kies',
                selected: false,
                hide: false,
                initialClass: ['text-center'],
                class: ['text-center'],
            }]
        },
    ];
    players = [{name: 'Kasper Dolberg', team: 'Ajax', position: 'forward'},
        {name: 'Hakim Ziyech', team: 'Ajax', position: 'forward'},
        {name: 'Jonathan Opoku', team: 'VVV', position: 'forward'},
        {name: 'Luuk de Jong', team: 'PSV', position: 'forward'},
        {name: 'Vilhena', team: 'Feyenoord', position: 'midfielder'},
        {name: 'Odegaard', team: 'Vitesse', position: 'midfielder'},
        {name: 'Linssen', team: 'Groningen', position: 'midfielder'},
        {name: 'Werner Holzapfel', team: 'Lochem', position: 'midfielder'},
        {name: 'Wout Brama', team: 'Twente', position: 'defender'},
        {name: 'Beugelsdijk', team: 'Ado den Haag', position: 'defender'},
        {name: 'Arne Slot', team: 'FC Utrecht', position: 'defender'},
        {name: 'Swinkels', team: 'Willem II', position: 'defender'},
        {name: 'Oscar Moens', team: 'AZ', position: 'keeper'}
    ];
    teams = [{name: 'Ajax'}, {name: 'PSV'},
        {name: 'Feyenoord'}, {name: 'Vitesse'},
        {name: 'Groningen'}, {name: 'Twente'},
        {name: 'Ado den Haag'}, {name: 'FC Utrecht'},
        {name: 'Willem II'}, {name: 'AZ'}, {name: 'VVV'}, {name: 'Lochem'}
    ];
    team = [];
    unsubscribe = new Subject<void>();

    constructor(private modalController: ModalController, private toastService: ToastService) {
    }

    ngOnInit() {
        // todo team ophalen
        // todo teams ophalen
        // todo spelers ophalen
    }

    save() {
        console.table(this.team);
    }


    async addPlayer(request: { formationIndex: number, position: string, player: any }) {
        if (request.player.selected) {
            this.formation[request.formationIndex].players.map(
                p => p.index === request.player.index ?
                    Object.assign(request.player, {name: 'Kies'}, {selected: false}, {team: null}) :
                    Object.assign(p));
            this.createTeam();

            return;
        }
        const modal = await this.modalController.create({
            component: AddPlayerPage,
            componentProps: {
                players: this.players.filter(p => {
                    return this.team.filter(teamplayer => {
                            return teamplayer.team === p.team;
                        }).length === 0 // todo use id
                        && p.position === request.position;
                }),
                teams: this.teams.filter(team => !this.team.find(pt => pt.team === team.name)),
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
        const numberOfKeepers = this.team.filter(player => player.selected && player.position === 'keeper').length;
        const numberOfDefenders = this.team.filter(player => player.selected && player.position === 'defender').length;

        const numberOfMidfielders = this.team.filter(player => player.selected && player.position === 'midfielder').length;
        const numberOfForwards = this.team.filter(player => player.selected && player.position === 'forward').length;

        const isTeamComplete: boolean = this.team.filter(player => player.selected).length === 11 &&
            numberOfKeepers === 1 &&
            numberOfDefenders >= 3 &&
            numberOfDefenders <= 4 &&
            numberOfMidfielders >= 3 &&
            numberOfMidfielders <= 4 &&
            numberOfForwards >= 2 &&
            numberOfForwards <= 3;

        this.hideNotSelectedPlayer(isTeamComplete);

        return isTeamComplete;
    }

    hideNotSelectedPlayer(teamCompleted: boolean) {
        this.formation.map(f => f.players.map(pl => {
            return !teamCompleted ? Object.assign(pl, {hide: false}) :
                pl.selected && f.players.filter(p => p.selected).length === 1 ?
                    Object.assign(pl, {hide: false}, {class: ['text-center']}) :
                    Object.assign(pl, {hide: !pl.selected}, {class: pl.initialClass});
        }));
        console.table(this.formation);
    }

    ngOnDestroy(): void {
        this.unsubscribe.unsubscribe();
    }

}
