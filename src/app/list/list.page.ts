import {Component, OnInit, ViewChild} from '@angular/core';
import {IonReorderGroup} from '@ionic/angular';
import {PredictionsService} from '../services/predictions.service';
import {RankingTeam} from '../models/prediction.model';
import {combineLatest, from, Subject} from 'rxjs';
import {Store} from '@ngrx/store';
import {switchMap, takeUntil} from 'rxjs/operators';
import {Competition} from '../models/competition.model';
import {IAppState} from '../store/store';
import {getCompetition} from '../store/competition/competition.reducer';
import {AuthService} from '../services/auth.service';

@Component({
    selector: 'app-list',
    templateUrl: 'list.page.html',
    styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit {
    @ViewChild(IonReorderGroup, {static: false}) reorderGroup: IonReorderGroup;

    private selectedItem: any;
    private icons = [
        'flask',
        'wifi',
        'beer',
        'football',
        'basketball',
        'paper-plane',
        'american-football',
        'boat',
        'bluetooth',
        'build'
    ];
    public isDirty = true;
    public items: RankingTeam[];
    unsubscribe = new Subject<void>();

    constructor(private store: Store<IAppState>, private predictionsService: PredictionsService, private authService: AuthService) {
    }

    ngOnInit() {

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
            this.isDirty = false;
            console.log(result); // todo show toast

        });
    }
}
