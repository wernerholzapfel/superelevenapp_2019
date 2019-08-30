import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {ModalController} from '@ionic/angular';

@Component({
    selector: 'app-playerStandItem',
    templateUrl: './player-stand-item.component.html',
    styleUrls: ['./player-stand-item.component.scss'],
})
export class PlayerStandItemComponent implements OnInit, OnDestroy {

    unsubscribe = new Subject<void>();
    showDetails = false;
    @Input() participants: any[];
    @Input() index = 0;
    participant: any;

    constructor(private modalController: ModalController) {
    }

    @Input() player: any;

    ngOnInit() {
        this.participant = this.participants[this.index];
    }

    async close() {
        await this.modalController.dismiss();
    }

    next() {
        this.index++;
        this.participant = this.participants[this.index];
    }

    previous() {
        this.index--;
        this.participant = this.participants[this.index];
    }

    ngOnDestroy(): void {
        this.unsubscribe.next();
        this.unsubscribe.complete();
    }
}
