import {Component, OnDestroy, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {BehaviorSubject, of, Subject} from 'rxjs';
import {ToastService} from '../../services/toast.service';
import {IAppState} from '../../store/store';
import {Store} from '@ngrx/store';
import {StandenService} from '../../services/standen.service';
import {getCompetition} from '../../store/competition/competition.reducer';
import {mergeMap, takeUntil} from 'rxjs/operators';
import {PredictionType} from '../../models/competition.model';
import {Round} from '../../models/prediction.model';
import {MatchCardComponent} from '../../components/match-card/match-card.component';
import {PlayerStandItemComponent} from '../../components/player-stand-item/player-stand-item.component';

@Component({
    selector: 'app-players',
    templateUrl: './players.page.html',
    styleUrls: ['./players.page.scss'],
})


export class PlayersPage implements OnInit, OnDestroy {
    activeRound = 'Totaal';
    rounds: Round[];
    customPopoverOptions: any = {
        header: 'speelronde',
    };
    activeRound$: BehaviorSubject<string> = new BehaviorSubject('Totaal');
    competition: any;

    unsubscribe = new Subject<void>();
    stand: any[];

    constructor(private store: Store<IAppState>,
                private modalController: ModalController,
                private toastService: ToastService,
                private standenService: StandenService
    ) {
    }

    ngOnInit() {
        this.store.select(getCompetition).pipe(takeUntil(this.unsubscribe),
            mergeMap(competition => {
                if (competition && competition.predictions) {
                    this.competition = competition;
                    this.rounds = competition.predictions.find(p => p.predictionType === PredictionType.Team).rounds;
                }
                return this.activeRound$;
            }),
            mergeMap(activeRound => {
                this.activeRound = activeRound;
                if (this.activeRound && this.competition && this.competition.predictions && this.competition.predictions.length > 0) {
                    return activeRound.toLowerCase() === 'totaal' ?
                        this.standenService.getTeamStand(this.competition.predictions
                            .find(prediction => prediction.predictionType === PredictionType.Team).id) :
                        this.standenService.getRoundTeamStand(this.competition.predictions
                            .find(prediction => prediction.predictionType === PredictionType.Team).id, activeRound);
                } else {
                    return of([]);
                }
            }))
            .subscribe(stand => {
                this.stand = stand;
            });
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

    ngOnDestroy(): void {
        this.unsubscribe.unsubscribe();
    }
}
