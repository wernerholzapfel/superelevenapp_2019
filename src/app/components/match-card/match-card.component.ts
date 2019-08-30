import {Component, Input, OnInit} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {isRegistrationOpen} from '../../store/competition/competition.reducer';
import {takeUntil} from 'rxjs/operators';
import {Store} from '@ngrx/store';
import {IAppState} from '../../store/store';
import {MatchPrediction} from '../../models/match.model';

@Component({
    selector: 'app-match-card',
    templateUrl: './match-card.component.html',
    styleUrls: ['./match-card.component.scss'],
})
export class MatchCardComponent implements OnInit {

    @Input() matchPredictions: MatchPrediction[];
    @Input() canPredict = true;

    public isRegistrationOpen$: Observable<boolean>;
    unsubscribe = new Subject<void>();

    constructor(private store: Store<IAppState>) {
    }

    ngOnInit() {
        this.isRegistrationOpen$ = this.store.select(isRegistrationOpen).pipe(takeUntil(this.unsubscribe));

    }

    checkIsNotNull(getal: number): boolean {
        return getal !== null;
    }
}
