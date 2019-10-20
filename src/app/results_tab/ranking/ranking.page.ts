import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {IonReorderGroup} from '@ionic/angular';
import {RankingTeam} from '../../models/prediction.model';
import {forkJoin, from, of, Subject} from 'rxjs';
import {Store} from '@ngrx/store';
import {first, mergeMap, takeUntil} from 'rxjs/operators';
import {Competition, Prediction, PredictionType} from '../../models/competition.model';
import {IAppState} from '../../store/store';
import {getCompetition} from '../../store/competition/competition.reducer';
import {ToastService} from '../../services/toast.service';
import {ResultScoreService} from '../../services/result-score.service';
import {StandenService} from '../../services/standen.service';

@Component({
    selector: 'app-ranking',
    templateUrl: 'ranking.page.html',
    styleUrls: ['ranking.page.scss']
})
export class RankingPage implements OnInit, OnDestroy {
    @ViewChild(IonReorderGroup, {static: false}) reorderGroup: IonReorderGroup;

    public isDirty = false;
    public items: RankingTeam[];
    competition: Competition;
    prediction: Prediction;
    unsubscribe = new Subject<void>();

    constructor(private store: Store<IAppState>,
                private resultScoreService: ResultScoreService,
                private standenService: StandenService,
                private toastService: ToastService) {
    }

    ngOnInit() {
        this.store.select(getCompetition).pipe(takeUntil(this.unsubscribe), mergeMap((competition: Competition) => {
            if (competition && competition.id) {
                this.competition = competition;
                this.prediction = competition.predictions.find(p => p.predictionType === PredictionType.Ranking);

                return this.resultScoreService.getRankingTeamsResults(competition.id);
            } else {
                return from([]);
            }
        })).pipe(takeUntil(this.unsubscribe)).subscribe(
            (rankingTeams) => {
                this.items = rankingTeams.map((item, index) => this.addPosition(item, index));
            });
    }

    doReorder(ev: any) {
        this.isDirty = true;
        this.items = ev.detail.complete(this.items).map((item, index) => this.addPosition(item, index));
    }

    addPosition(item, index) {
        return Object.assign(item, {position: index + 1});
    }

    saveRankingResults() {
        this.resultScoreService.postRankingResults(this.items).pipe(mergeMap(result => {
            return forkJoin([
                this.standenService.createRankingStand(this.competition.id, this.prediction.id).pipe(first()),
                this.standenService.createTotalStand(this.competition.id).pipe(first())
            ]);
        })).subscribe(([res1, res2]) => {
            this.toastService.presentToast('Standen bijgewerkt');
        }, error => {
            this.toastService.presentToast('er is iets misgegaan bij het opslaan', 'warning');
        });
    }

    canDeactivate() {
        // todo
        if (this.isDirty && false) {
            return this.toastService.presentAlertConfirm().then(alertResponse => {
                return alertResponse;
            });
        } else {
            return of(true);
        }
    }

    ngOnDestroy(): void {
        this.unsubscribe.next();
        this.unsubscribe.unsubscribe();
    }


}
