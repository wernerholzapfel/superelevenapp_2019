import {Component, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {IonContent, ModalController, NavParams} from '@ionic/angular';
import {PositionType, TeamplayerResponse} from '../../../models/teamplayer.model';
import {ScoreformUiService} from '../../../services/scoreform-ui.service';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {TeamplayerScoresService} from '../../../services/teamplayer-scores.service';
import {ToastService} from '../../../services/toast.service';
import {Competition, Prediction} from '../../../models/competition.model';
import {Formation} from '../../../models/formation.model';

@Component({
    selector: 'app-playerStandItem',
    templateUrl: './player-stand-item.component.html',
    styleUrls: ['./player-stand-item.component.scss'],
})
export class PlayerStandItemComponent implements OnInit, OnDestroy {

    unsubscribe = new Subject<void>();

    constructor() {
    }

    @Input() player: any;
    ngOnInit() {
    }

    ngOnDestroy(): void {
        this.unsubscribe.next();
        this.unsubscribe.complete();
    }
}
