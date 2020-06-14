import {Component, OnDestroy, OnInit} from '@angular/core';
import {BehaviorSubject, combineLatest, Subject} from 'rxjs';
import {MatchCardComponent} from '../../components/match-card/match-card.component';
import {StandenService} from '../../services/standen.service';
import {ModalController} from '@ionic/angular';
import {Store} from '@ngrx/store';
import {IAppState} from '../../store/store';
import {ScoreformUiService} from '../../services/scoreform-ui.service';
import {UiService} from '../../ui.service';
import {LoaderService} from '../../services/loader.service';
import {takeUntil} from 'rxjs/operators';
import {RankingResultsComponent} from '../../components/ranking-results/ranking-results.component';

@Component({
    selector: 'app-ranking-stand',
    templateUrl: './ranking-stand.page.html',
    styleUrls: ['./ranking-stand.page.scss'],
})
export class RankingStandPage implements OnInit, OnDestroy {

    unsubscribe = new Subject<void>();
    stand: any[] = [];
    isLoading: Subject<boolean> = this.loaderService.isLoading;
    searchTerm$: BehaviorSubject<string> = new BehaviorSubject('');

    constructor(private standenService: StandenService,
                private modalController: ModalController,
                private store: Store<IAppState>,
                private scoreformUiService: ScoreformUiService,
                private uiService: UiService,
                private loaderService: LoaderService) {
    }

    ngOnInit() {
      combineLatest([
        this.uiService.rankingstand$,
        this.searchTerm$])
          .pipe(takeUntil(this.unsubscribe))
          .subscribe(([matches, searchTerm]) => {
            if (matches) {
              this.stand = this.scoreformUiService.filterDeelnemers(searchTerm, matches);
            }
          });
    }

    async openDetails(index) {
        const modal = await this.modalController.create({
            component: RankingResultsComponent,
            componentProps: {
                index,
                participants: this.stand,
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
