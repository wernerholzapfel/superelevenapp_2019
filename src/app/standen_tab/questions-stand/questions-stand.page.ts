import {Component, OnDestroy, OnInit} from '@angular/core';
import {BehaviorSubject, combineLatest, Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {MatchCardComponent} from '../../components/match-card/match-card.component';
import {StandenService} from '../../services/standen.service';
import {ModalController} from '@ionic/angular';
import {Store} from '@ngrx/store';
import {IAppState} from '../../store/store';
import {ScoreformUiService} from '../../services/scoreform-ui.service';
import {UiService} from '../../ui.service';
import {LoaderService} from '../../services/loader.service';
import {QuestionScoreComponent} from '../../components/question-score/question-score.component';

@Component({
  selector: 'app-questions-stand',
  templateUrl: './questions-stand.page.html',
  styleUrls: ['./questions-stand.page.scss'],
})
export class QuestionsStandPage implements OnInit , OnDestroy {
  unsubscribe = new Subject<void>();
  stand: any[] = [];
  isLoading: Subject<boolean> = this.loaderService.isLoading;
  searchTerm$: BehaviorSubject<string> = new BehaviorSubject('');


  constructor(private standenService: StandenService,
              private modalController: ModalController,
              private store: Store<IAppState>,
              private scoreformUiService: ScoreformUiService,
              private uiService: UiService,
              private loaderService: LoaderService) { }

  ngOnInit() {
    combineLatest([
      this.uiService.questionstand$,
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
      component: QuestionScoreComponent,
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
