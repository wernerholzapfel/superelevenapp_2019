import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Formation} from '../models/formation.model';

@Component({
    selector: 'app-formation-line',
    templateUrl: './formation-line.component.html',
    styleUrls: ['./formation-line.component.scss'],
})
export class FormationLineComponent implements OnInit {

    constructor() {
    }

    @Input() line: Formation;
    @Input() isTransferPossible: boolean;
    @Output() playerAdd = new EventEmitter<{ formationIndex: number, position: string, player: any }>();

    ngOnInit() {
    }

    addPlayer(formationIndex: number, position: string, player: any) {
        this.playerAdd.emit({formationIndex, position, player});
    }
}
