import {Component, OnInit} from '@angular/core';
import {RoundService} from '../services/round.service';
import {getCompetition} from '../store/competition/competition.reducer';
import {mergeMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {IAppState} from '../store/store';
import {Store} from '@ngrx/store';

@Component({
    selector: 'app-resultstab',
    templateUrl: './results_tab.page.html',
    styleUrls: ['./results_tab.page.scss'],
})
export class ResultsTabPage implements OnInit {


    constructor(private roundService: RoundService,
                private store: Store<IAppState>) {
    }

    ngOnInit() {

        this.roundService.getPreviousRound().subscribe(round => {
            this.roundService.previousRoundId$.next(round.id);
        });

        this.store.select(getCompetition).pipe(
            mergeMap(competition => {
                if (competition && competition.id) {
                    return this.roundService.getallRounds(competition.id);
                } else {
                    return of(null);
                }
            }))
            .subscribe(rounds => {
                this.roundService.allRounds$.next(rounds);
            });

    }


}
