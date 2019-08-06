import {Component, OnDestroy, OnInit} from '@angular/core';
import {ModalController, NavParams} from '@ionic/angular';
import {Teamplayer} from '../../../models/teamplayer.model';
import {Team} from '../../../models/team.model';
import {BehaviorSubject, combineLatest, Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {ScoreformUiService} from '../../../services/scoreform-ui.service';

@Component({
    selector: 'app-addplayer',
    templateUrl: './add-player-page.component.html',
    styleUrls: ['./add-player-page.component.scss'],
})
export class AddPlayerPage implements OnInit, OnDestroy {

    formationIndex: number;
    position: string;
    formationPlayer: any;
    players: Teamplayer[];
    allPlayers: Teamplayer[];
    teams: Team[];
    customPopoverOptions: any = {
        header: 'Team',
    };
    searchTerm$: BehaviorSubject<string> = new BehaviorSubject('');
    teamFilter$: BehaviorSubject<string> = new BehaviorSubject('');
    unsubscribe = new Subject<void>();

    constructor(
        private modalController: ModalController,
        private navParams: NavParams,
        private scoreformUiService: ScoreformUiService
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

        combineLatest(this.searchTerm$, this.teamFilter$)
            .pipe(takeUntil(this.unsubscribe))
            .subscribe(([searchTerm, teamFilter]) => {
                this.players = this.scoreformUiService.filterPlayers(searchTerm, teamFilter, this.allPlayers);
            });
    }

    search($event) {
        this.searchTerm$.next($event.detail.value);
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
       this.teamFilter$.next(event.detail.value);
    }

    ngOnDestroy(): void {
        this.unsubscribe.next();
        this.unsubscribe.unsubscribe();
    }
}
