import {Component, OnDestroy, OnInit} from '@angular/core';
import {StandenService} from '../../services/standen.service';
import {getCompetition} from '../../store/competition/competition.reducer';
import {mergeMap, takeUntil} from 'rxjs/operators';
import {IAppState} from '../../store/store';
import {Store} from '@ngrx/store';
import {PredictionType} from '../../models/competition.model';
import {BehaviorSubject, combineLatest, of, Subject} from 'rxjs';
import {ModalController} from '@ionic/angular';
import {MatchCardComponent} from '../../components/match-card/match-card.component';
import {LoaderService} from '../../services/loader.service';
import {ScoreformUiService} from '../../services/scoreform-ui.service';
import {AngularFireDatabase} from '@angular/fire/database';
import {UiService} from '../../ui.service';

@Component({
    selector: 'app-stand-matches',
    templateUrl: './stand.matches.page.html',
    styleUrls: ['./stand.matches.page.scss'],
})
export class StandMatchesPage implements OnInit, OnDestroy {
    unsubscribe = new Subject<void>();
    stand: any[] = [];

    constructor(private standenService: StandenService,
                private modalController: ModalController,
                private store: Store<IAppState>,
                private scoreformUiService: ScoreformUiService,
                private uiService: UiService,
                private loaderService: LoaderService,
                private db: AngularFireDatabase) {
    }

    isLoading: Subject<boolean> = this.loaderService.isLoading;
    searchTerm$: BehaviorSubject<string> = new BehaviorSubject('');

    ngOnInit() {
        this.store.select(getCompetition).pipe(takeUntil(this.unsubscribe), mergeMap(competition => {
            if (competition && competition.predictions) {
                const predictionId = competition.predictions.find(prediction => prediction.predictionType === PredictionType.Matches).id;
                return combineLatest([
                    this.uiService.wedstrijdstand$,
                    this.searchTerm$]);
            } else {
                return of([]);
            }
        }))
            .pipe(takeUntil(this.unsubscribe))
            .subscribe(([matches, searchTerm]) => {
                if (matches) {
                    this.stand = this.scoreformUiService.filterDeelnemers(searchTerm, matches);
                }
            });
    }

    async openDetails(index) {
        const modal = await this.modalController.create({
            component: MatchCardComponent,
            componentProps: {
                index,
                participants: this.stand,
                canPredict: false,

            }
        });

        modal.onDidDismiss().then((event) => {
            if (event.data) {
            }
        });

        return await modal.present();
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
