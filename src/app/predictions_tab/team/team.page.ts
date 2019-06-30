import {Component, OnDestroy, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {AddPlayerPage} from './addplayer/add-player-page.component';
import {Subject} from 'rxjs';

@Component({
    selector: 'app-team',
    templateUrl: './team.page.html',
    styleUrls: ['./team.page.scss'],
})
export class TeamPage implements OnInit, OnDestroy {
    keeper: any[] = [];
    defenders: any[] = [];
    midfielders: any[] = [];
    forwards: any[] = [];
    numberOfKeeper: any[] = [];
    numberOfDefenders: any[] = [];
    numberOfMidfielders: any[] = [];
    numberOfForwards: any[] = [];
    players = [{name: 'Kasper Dolberg', team: 'Ajax', position: 'forward'},
        {name: 'Hakim Ziyech', team: 'Ajax', position: 'forward'},
        {name: 'Luuk de Jong', team: 'PSV', position: 'forward'},
        {name: 'Vilhena', team: 'Feyenoord', position: 'midfielder'},
        {name: 'Odegaard', team: 'Vitesse', position: 'midfielder'},
        {name: 'Linssen', team: 'Groningen', position: 'midfielder'},
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
        {name: 'Willem II'}, {name: 'AZ'}
    ];
    team = [];
    unsubscribe = new Subject<void>();

    constructor(private modalController: ModalController) {
    }

    ngOnInit() {
        this.calculateNumberOf();
        // todo team ophalen
        // todo teams ophalen
        // todo spelers ophalen
    }

    save() {
        console.table(this.team);
    }

    calculateNumberOf() {
        this.numberOfKeeper = Array(1 - this.keeper.length);
        this.numberOfDefenders = Array(4 - this.defenders.length);
        this.numberOfMidfielders = Array(3 - this.midfielders.length);
        this.numberOfForwards = Array(3 - this.forwards.length);
    }

    canISaveForm() {
        return this.team.length === 11;
    }

    async addPlayer(position: string) {
        const modal = await this.modalController.create({
            component: AddPlayerPage,
            componentProps: {
                players: this.players.filter(p => {
                    return this.team.filter(teamplayer => {
                        return teamplayer.name === p.name;
                    }).length === 0 // todo use id
                    && p.position === position;
                }),
                teams: this.teams
            }
        });

        modal.onDidDismiss().then((player) => {
            if (player.data !== null && player.data !== undefined) {
                switch (player.data.position) {
                    case 'keeper':
                        this.keeper = new Array(player.data);
                        break;
                    case 'defender':
                        this.defenders.push(player.data);
                        break;
                    case 'midfielder':
                        this.midfielders.push(player.data);
                        break;
                    case 'forward':
                        this.forwards.push(player.data);
                        break;
                    default:
                    // code block
                }
                this.calculateNumberOf();
                this.team = Array(...this.keeper, ...this.defenders, ...this.midfielders, ...this.forwards);

            }
        });

        return await modal.present();
    }

    ngOnDestroy(): void {
        this.unsubscribe.unsubscribe();
    }

}
