import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
    selector: 'app-formation-line',
    templateUrl: './formation-line.component.html',
    styleUrls: ['./formation-line.component.scss'],
})
export class FormationLineComponent implements OnInit {

    constructor() {
    }

    @Input() position: string;
    @Input() players: any[];
    @Input() numberOfPlayers: any[];
    @Output() playerAdd = new EventEmitter<string>();

    ngOnInit() {
    }

    addPlayer(position: string) {
        this.playerAdd.emit(position);
    }
}
