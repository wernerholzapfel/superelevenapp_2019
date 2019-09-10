import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-player-detail-score',
    templateUrl: './player-detail-score.component.html',
    styleUrls: ['./player-detail-score.component.scss'],
})
export class PlayerDetailScoreComponent {

    @Input() player: any;

    constructor() {
    }
}
