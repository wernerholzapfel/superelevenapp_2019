import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Subject} from 'rxjs';

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
