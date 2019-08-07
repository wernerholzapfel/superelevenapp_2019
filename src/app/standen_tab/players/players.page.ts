import {Component, OnDestroy, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {of, Subject} from 'rxjs';
import {ToastService} from '../../services/toast.service';
import {IAppState} from '../../store/store';
import {Store} from '@ngrx/store';
import {StandenService} from '../../services/standen.service';
import {getCompetition} from '../../store/competition/competition.reducer';
import {mergeMap, takeUntil} from 'rxjs/operators';
import {PredictionType} from '../../models/competition.model';

@Component({
    selector: 'app-players',
    templateUrl: './players.page.html',
    styleUrls: ['./players.page.scss'],
})


export class PlayersPage implements OnInit, OnDestroy {

    customPopoverOptions: any = {
        header: 'speelronde',
    };
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
                return (competition && competition.predictions && competition.predictions.length > 0) ?
                    this.standenService.getTeamStand(competition.predictions
                        .find(prediction => prediction.predictionType === PredictionType.Team).id) : of([]);
            }))
            .subscribe(stand => {
                this.stand = stand;
                console.log(stand);
            });
    }


    ngOnDestroy(): void {
        this.unsubscribe.unsubscribe();
    }
}
