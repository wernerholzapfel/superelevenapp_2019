import {Component, Input, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';

@Component({
    selector: 'app-ranking-results',
    templateUrl: './ranking-results.component.html',
    styleUrls: ['./ranking-results.component.scss'],
})
export class RankingResultsComponent implements OnInit {

    @Input() participants: any[];
    @Input() index = 0;

    participant: any;

    constructor(private modalController: ModalController) {
    }

    ngOnInit() {
        if (this.participants) {
            this.participant = this.participants[this.index];
        }
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
}
