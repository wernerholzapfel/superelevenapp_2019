import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {IonReorderGroup} from '@ionic/angular';
import {PredictionService} from '../../services/prediction.service';
import {RankingTeam} from '../../models/prediction.model';
import {combineLatest, from, Observable, of, Subject} from 'rxjs';
import {Store} from '@ngrx/store';
import {switchMap, takeUntil} from 'rxjs/operators';
import {Competition} from '../../models/competition.model';
import {IAppState} from '../../store/store';
import {getCompetition, isRegistrationOpen} from '../../store/competition/competition.reducer';
import {ToastService} from '../../services/toast.service';

@Component({
    selector: 'app-ranking',
    templateUrl: 'ranking.page.html',
    styleUrls: ['ranking.page.scss']
})
export class RankingPage implements OnInit, OnDestroy {
    @ViewChild(IonReorderGroup, {static: false}) reorderGroup: IonReorderGroup;

    public isDirty = false;
    public items: RankingTeam[];
    unsubscribe = new Subject<void>();
    public isRegistrationOpen$: Observable<boolean>;

    constructor(private store: Store<IAppState>,
                private predictionsService: PredictionService,
                private toastService: ToastService) {
    }

    ngOnInit() {

        this.isRegistrationOpen$ = this.store.select(isRegistrationOpen).pipe(takeUntil(this.unsubscribe));

        this.store.select(getCompetition).pipe(takeUntil(this.unsubscribe), switchMap((competition: Competition) => {
            if (competition && competition.id) {
                return combineLatest(this.predictionsService.getRankingTeams(competition.id),
                    this.predictionsService.getRankingTeamsPrediction(competition.id));
            } else {
                return from([]);
            }
        })).subscribe(
            ([rankingTeams, rankingPrediction]) => {
                if (rankingPrediction && rankingPrediction.length > 0) {
                    this.isDirty = false;
                    this.items = rankingPrediction.map((item, index) => this.addPosition(item, index));
                } else if (!rankingPrediction || rankingPrediction.length === 0 && rankingTeams) {
                    console.log(rankingTeams);
                    this.items = rankingTeams.map((item, index) => this.addPosition(item, index));
                }
            });
    }

    doReorder(ev: any) {
        this.isDirty = true;
        this.items = ev.detail.complete(this.items).map((item, index) => this.addPosition(item, index));
    }

    addPosition(item, index) {
        return Object.assign(item, {position: index + 1});
    }

    canISaveForm() {
        return this.items && this.items.length > 0 && this.isDirty;
    }

    saveRankingPrediction() {
        this.predictionsService.saveRankingPredictions(this.items).subscribe(result => {
            this.toastService.presentToast('Stand opgeslagen', 'primary');
            this.isDirty = false;
        });
    }

    canDeactivate(): Observable<boolean> | Promise<boolean> {
        if (this.isDirty) {
            return this.toastService.presentAlertConfirm().then(alertResponse => {
                console.log(alertResponse);
                return alertResponse;
            });
        } else {
            return of(true);
        }
    }


    ngOnDestroy(): void {
        this.unsubscribe.unsubscribe();
    }


}
