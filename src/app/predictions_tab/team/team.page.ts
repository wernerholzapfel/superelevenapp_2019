import {Component, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {AddPlayerPage} from './addplayer/add-player-page.component';

@Component({
    selector: 'app-team',
    templateUrl: './team.page.html',
    styleUrls: ['./team.page.scss'],
})
export class TeamPage implements OnInit {
    keeper: any[] = [];
    defenders: any[] = [];
    midfielders: any[] = [];
    forwards: any[] = [];

    team = [];

    constructor(private modalController: ModalController) {
    }

    ngOnInit() {
        // todo team ophalen
        // todo teams ophalen
        // todo spelers ophalen
    }

    save() {
        console.table(this.team);
    }

    canISaveForm() {
        return this.team.length > 1;
    }

    async addPlayer() {
        const modal = await this.modalController.create({
            component: AddPlayerPage,
            componentProps: {
                players: [{name: 'Kasper Dolberg', team: 'Ajax', position: 'forward'},
                    {name: 'Hakim Ziyech', team: 'Ajax', position: 'forward'},
                    {name: 'Luuk de Jong', team: 'PSV', position: 'forward'},
                    {name: 'Jeroen Zoet', team: 'PSV', position: 'keeper'}
                ],
                teams: [{name: 'Ajax'}, {name: 'PSV'}]
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
                this.team = Object.assign({}, ...this.keeper, ...this.defenders, ...this.midfielders, ...this.forwards);

            }
        });

        return await modal.present();
    }
}
