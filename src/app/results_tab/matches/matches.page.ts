import {Component, OnDestroy, OnInit} from '@angular/core';
import {getCompetition, getPredictions} from '../../store/competition/competition.reducer';
import {mergeMap, takeUntil} from 'rxjs/operators';
import {Competition, Prediction, PredictionType} from '../../models/competition.model';
import {combineLatest, of, Subject} from 'rxjs';
import {IAppState} from '../../store/store';
import {Store} from '@ngrx/store';
import {PredictionService} from '../../services/prediction.service';
import {Match} from '../../models/match.model';
import {ToastService} from '../../services/toast.service';
import {Round} from '../../models/prediction.model';
import {RoundService} from '../../services/round.service';
import {StandenService} from '../../services/standen.service';

@Component({
    selector: 'app-matches',
    templateUrl: './matches.page.html',
    styleUrls: ['./matches.page.scss'],
})
export class MatchesPage implements OnInit, OnDestroy {

    public isDirty = false;
    public matches: Match[];
    public rounds: Round[];
    public prediction: Prediction;
    public competition: Competition;
    unsubscribe = new Subject<void>();

    customPopoverOptions: any = {
        header: 'Score',
    };

    constructor(private store: Store<IAppState>,
                private predictionsService: PredictionService,
                private roundService: RoundService,
                private toastService: ToastService,
                private standenService: StandenService) {
    }

    ngOnInit() {
        this.store.select(getCompetition).pipe(takeUntil(this.unsubscribe), mergeMap((competition: Competition) => {
            if (competition && competition.predictions && competition.predictions.length > 0) {
                this.competition = competition;
                this.prediction =  competition.predictions.find(p => p.predictionType === PredictionType.Matches);
                return combineLatest([
                    this.predictionsService.getMatches(this.prediction.id),
                this.roundService.getallRounds(competition.id)
                ]);
            } else {
                return of([]);
            }
        })).pipe(takeUntil(this.unsubscribe))
            .subscribe(([matches, rounds]) => {
                this.matches = matches;
                this.rounds = rounds;
            });
    }

    updateMatchStand() {
        this.standenService.createMatchesStand(this.competition.id, this.prediction.id).subscribe(result => {
            this.toastService.presentToast('Wedstrijdenstand is bijgewerkt');
        }, error => {
            this.toastService.presentToast('er is iets misgegaan bij het opslaan', 'warning');
        });
    }
    ngOnDestroy(): void {
        this.unsubscribe.next();
        this.unsubscribe.unsubscribe();
    }

}
