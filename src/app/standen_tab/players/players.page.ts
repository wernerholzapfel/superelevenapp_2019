import {Component, OnDestroy, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {BehaviorSubject, combineLatest, of, Subject} from 'rxjs';
import {ToastService} from '../../services/toast.service';
import {IAppState} from '../../store/store';
import {Store} from '@ngrx/store';
import {getCompetition} from '../../store/competition/competition.reducer';
import {mergeMap, takeUntil} from 'rxjs/operators';
import {PredictionType} from '../../models/competition.model';
import {Round} from '../../models/prediction.model';
import {PlayerStandItemComponent} from '../../components/player-stand-item/player-stand-item.component';
import {LoaderService} from '../../services/loader.service';
import {ScoreformUiService} from '../../services/scoreform-ui.service';
import {AngularFireDatabase} from '@angular/fire/database';
import {RoundService} from '../../services/round.service';

@Component({
    selector: 'app-players',
    templateUrl: './players.page.html',
    styleUrls: ['./players.page.scss'],
})


export class PlayersPage implements OnInit, OnDestroy {
    activeRound$: BehaviorSubject<string> = new BehaviorSubject('Totaal');
    isLoading: Subject<boolean> = this.loaderService.isLoading;
    searchTerm$: BehaviorSubject<string> = new BehaviorSubject('');

    customPopoverOptions: any = {
        header: 'speelronde',
    };

    activeRound = 'Totaal';
    rounds: Round[];

    competition: any;
    stand: any[];
    unsubscribe = new Subject<void>();

    constructor(private store: Store<IAppState>,
                private modalController: ModalController,
                private toastService: ToastService,
                private db: AngularFireDatabase,
                private scoreformUiService: ScoreformUiService,
                private roundService: RoundService,
                private loaderService: LoaderService
    ) {
    }

    ngOnInit() {
        this.roundService.getPlayedRounds().subscribe(rounds => {
            this.rounds = rounds;
        });

        this.store.select(getCompetition).pipe(takeUntil(this.unsubscribe),
            mergeMap(competition => {
                if (competition && competition.predictions) {
                    this.competition = competition;
                }
                return this.activeRound$;
            }),
            mergeMap(activeRound => {
                this.activeRound = activeRound;
                if (this.activeRound && this.competition && this.competition.predictions && this.competition.predictions.length > 0) {
                    const predictionId = this.competition.predictions
                        .find(prediction => prediction.predictionType === PredictionType.Team).id;
                    return activeRound.toLowerCase() === 'totaal' ?
                        combineLatest([
                            this.db.list<any>(`${this.competition.id}/${predictionId}/${PredictionType.Team}/totaal`).valueChanges(),
                            this.searchTerm$]) :
                        combineLatest([
                            this.db.list<any>(
                                `${this.competition.id}/${predictionId}/${PredictionType.Team}/${activeRound}`).valueChanges(),
                            this.searchTerm$]);
                } else {
                    return of([]);
                }
            }))
            .pipe(takeUntil(this.unsubscribe))
            .subscribe(([stand, searchTerm]) => {
                    if (stand) {
                        this.stand = this.scoreformUiService.filterDeelnemers(searchTerm, stand);
                    }
                }
            );
    }

    filterRounds($event) {
        this.activeRound$.next($event.detail.value);
    }

    async openDetails(index) {
        const modal = await this.modalController.create({
            component: PlayerStandItemComponent,
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
