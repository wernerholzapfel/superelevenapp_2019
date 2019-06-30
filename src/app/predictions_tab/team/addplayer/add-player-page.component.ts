import {Component, OnInit} from '@angular/core';
import {ModalController, NavParams} from '@ionic/angular';

@Component({
    selector: 'app-addplayer',
    templateUrl: './add-player-page.component.html',
    styleUrls: ['./add-player-page.component.scss'],
})
export class AddPlayerPage implements OnInit {

    players: any[];
    allPlayers: any[];
    teams: any[];

    constructor(
        private modalController: ModalController,
        private navParams: NavParams
    ) {
    }

    ngOnInit() {
        console.table(this.navParams);
        this.teams = this.navParams.data.teams;
        this.allPlayers = this.navParams.data.players;
        this.players = this.navParams.data.players;
    }

    async addPlayer(player) {
        await this.modalController.dismiss(player);
    }

    async dismiss() {
        await this.modalController.dismiss();
    }

    filterPlayers(event) {
        this.players = this.allPlayers.filter(p => p.team === event.detail.value);
    }
}
