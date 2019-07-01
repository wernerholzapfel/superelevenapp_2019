import {Component, OnInit} from '@angular/core';
import {ModalController, NavParams} from '@ionic/angular';

@Component({
    selector: 'app-addplayer',
    templateUrl: './add-player-page.component.html',
    styleUrls: ['./add-player-page.component.scss'],
})
export class AddPlayerPage implements OnInit {

    formationIndex: number;
    position: string;
    formationPlayer: any;
    players: any[];
    allPlayers: any[];
    teams: any[];
    customPopoverOptions: any = {
        header: 'Team',
    };

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
        this.formationPlayer = this.navParams.data.formationPlayer;
        this.position = this.navParams.data.position;
        this.formationIndex = this.navParams.data.formationIndex;
    }

    async addPlayer(player) {
        await this.modalController.dismiss({
            formationIndex: this.formationIndex,
            position: this.position,
            formationPlayer: this.formationPlayer,
            player
        });
    }

    async dismiss() {
        await this.modalController.dismiss();
    }

    filterPlayers(event) {
        this.players = this.allPlayers.filter(p => p.team === event.detail.value);
    }
}
