import {Component, OnDestroy, OnInit} from '@angular/core';
import {StandenService} from '../../services/standen.service';
import {getCompetition} from '../../store/competition/competition.reducer';
import {mergeMap, takeUntil} from 'rxjs/operators';
import {IAppState} from '../../store/store';
import {Store} from '@ngrx/store';
import {PredictionType} from '../../models/competition.model';
import {of, Subject} from 'rxjs';
import {PlayerScoreformComponent} from '../../results_tab/players/playerScoreform/player-scoreform.component';
import {ModalController} from '@ionic/angular';
import {MatchCardComponent} from '../../components/match-card/match-card.component';

@Component({
    selector: 'app-stand-matches',
    templateUrl: './stand.matches.page.html',
    styleUrls: ['./stand.matches.page.scss'],
})
export class StandMatchesPage implements OnInit, OnDestroy {
    unsubscribe = new Subject<void>();
    stand: any[];
    constructor(private standenService: StandenService,
                private modalController: ModalController,
                private store: Store<IAppState>) {
    }

    ngOnInit() {
        this.store.select(getCompetition).pipe(takeUntil(this.unsubscribe), mergeMap(competition => {
            if (competition && competition.predictions) {
                return this.standenService.getMatchesStand(
                    competition.predictions.find(pr => pr.predictionType === PredictionType.Matches).id);
            } else {
                return of([]);
            }})
)
            .subscribe(matches => {
                this.stand = matches;
                console.table(matches);
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
    ngOnDestroy(): void {
        this.unsubscribe.unsubscribe();
    }

}
