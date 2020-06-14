import {Component, Input, OnInit} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {isRegistrationOpen} from '../../store/competition/competition.reducer';
import {takeUntil} from 'rxjs/operators';
import {Store} from '@ngrx/store';
import {IAppState} from '../../store/store';
import {MatchPrediction} from '../../models/match.model';
import {ModalController} from '@ionic/angular';

@Component({
    selector: 'app-match-card',
    templateUrl: './match-card.component.html',
    styleUrls: ['./match-card.component.scss'],
})
export class MatchCardComponent implements OnInit {

    @Input() matchPredictions: MatchPrediction[];
    @Input() participants: any[];
    @Input() canPredict = true;
    @Input() index = 0;

    participant: any;

    public isRegistrationOpen$: Observable<boolean>;
    unsubscribe = new Subject<void>();

    constructor(private store: Store<IAppState>,
                private modalController: ModalController,
    ) {
    }

    ngOnInit() {
        this.isRegistrationOpen$ = this.store.select(isRegistrationOpen).pipe(takeUntil(this.unsubscribe));
        if (this.participants) {
            this.participant = this.participants[this.index];
            this.matchPredictions = this.participants[this.index].matchPredictions;
        }
    }

    checkIsNotNull(getal: number): boolean {
        return getal !== null;
    }

    async close() {
        await this.modalController.dismiss();
    }

    next() {
        this.index++;
        this.participant = this.participants[this.index];
        this.matchPredictions = this.participants[this.index].matchPredictions;

    }

    previous() {
        this.index--;
        this.participant = this.participants[this.index];
        this.matchPredictions = this.participants[this.index].matchPredictions;
    }
}
