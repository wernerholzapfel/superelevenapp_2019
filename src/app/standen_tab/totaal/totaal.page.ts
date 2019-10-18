import {Component, OnDestroy, OnInit} from '@angular/core';
import {getCompetition} from '../../store/competition/competition.reducer';
import {mergeMap, takeUntil} from 'rxjs/operators';
import {PredictionType} from '../../models/competition.model';
import {BehaviorSubject, combineLatest, of, Subject} from 'rxjs';
import {IAppState} from '../../store/store';
import {Store} from '@ngrx/store';
import {StandenService} from '../../services/standen.service';
import {LoaderService} from '../../services/loader.service';
import {ScoreformUiService} from '../../services/scoreform-ui.service';
import {AngularFireDatabase} from '@angular/fire/database';

@Component({
    selector: 'app-totaal',
    templateUrl: './totaal.page.html',
    styleUrls: ['./totaal.page.scss'],
})
export class TotaalPage implements OnInit, OnDestroy {

    unsubscribe = new Subject<void>();
    stand: any[] = [];
    isLoading: Subject<boolean> = this.loaderService.isLoading;
    searchTerm$: BehaviorSubject<string> = new BehaviorSubject('');

    constructor(private store: Store<IAppState>,
                private scoreformUiService: ScoreformUiService,
                private standenService: StandenService,
                private loaderService: LoaderService,
                private db: AngularFireDatabase) {
    }

    ngOnInit() {
        this.store.select(getCompetition).pipe(takeUntil(this.unsubscribe), mergeMap(competition => {
            if (competition && competition.predictions) {
                return combineLatest([
                    this.db.list<any>(`${competition.id}/totaalstand/totaal`).valueChanges(),
                    this.searchTerm$]);
            } else {
                return of([]);
            }
        }))
            .pipe(takeUntil(this.unsubscribe))
            .subscribe(([totaalstand, searchTerm]) => {
                if (totaalstand) {
                    this.stand = this.scoreformUiService.filterDeelnemers(searchTerm, totaalstand);
                }
            });
    }

    search($event) {
        this.searchTerm$.next($event.detail.value);
    }

    ngOnDestroy(): void {
        this.unsubscribe.next();
        this.unsubscribe.unsubscribe();
        this.searchTerm$.unsubscribe();
    }

}
