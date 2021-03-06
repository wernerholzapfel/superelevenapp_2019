import {Component, OnDestroy, OnInit} from '@angular/core';
import {IHeadline} from '../../models/headline.model';
import {IAppState} from '../../store/store';
import {HeadlineService} from '../../services/headline.service';
import {getCompetition} from '../../store/competition/competition.reducer';
import {mergeMap, takeUntil} from 'rxjs/operators';
import {of, Subject} from 'rxjs';
import {Store} from '@ngrx/store';
import * as moment from 'moment';
import {IonRouterOutlet, ModalController} from '@ionic/angular';
import {EditHeadlineComponent} from '../edit-headline/edit-headline.component';
import {AuthService} from '../../services/auth.service';
import {Competition} from '../../models/competition.model';
import {AngularFireAuth} from '@angular/fire/auth';

@Component({
    selector: 'app-headline',
    templateUrl: './headline.component.html',
    styleUrls: ['./headline.component.scss'],
})
export class HeadlineComponent implements OnInit, OnDestroy {

    lastUpdated: string;
    headline: IHeadline;
    headlineIndex = 0;
    headlines: IHeadline[];
    unsubscribe = new Subject<void>();
    competition: Competition;
    isAdmin: boolean;

    constructor(private store: Store<IAppState>,
                private authService: AuthService,
                private headlineService: HeadlineService,
                private modalController: ModalController,
                private routerOutlet: IonRouterOutlet,
                private angularFireAuth: AngularFireAuth) {
        moment.locale('nl');
    }

    ngOnInit() {
        this.authService.user$.pipe(takeUntil(this.unsubscribe)).subscribe(user => {
            if (user) {
                this.angularFireAuth.auth.currentUser.getIdTokenResult(true).then(tokenResult => {
                    this.isAdmin = tokenResult.claims.admin;
                });
            } else {
                this.isAdmin = false;
            }
        });
        this.store.select(getCompetition).pipe(takeUntil(this.unsubscribe), mergeMap(competition => {
            if (competition && competition.predictions) {
                this.competition = competition;
                return this.headlineService.getHeadlines(competition.id);
            } else {
                return of([]);
            }
        }))
            .pipe(takeUntil(this.unsubscribe))
            .subscribe(headlines => {
                if (headlines && headlines.length > 0) {
                    this.headlines = headlines;
                    this.headline = headlines[this.headlineIndex];
                    this.lastUpdated = moment(this.headline.createdDate).fromNow();
                }
            });
    }

    nextHeadline() {
        this.headlineIndex++;
        this.headline = this.headlines[this.headlineIndex];
        this.lastUpdated = moment(this.headline.createdDate).fromNow();

    }

    previousHeadline() {
        this.headlineIndex--;
        this.headline = this.headlines[this.headlineIndex];
        this.lastUpdated = moment(this.headline.createdDate).fromNow();

    }

    addHeadline() {

        this.editHeadline({title: '', text: '', isActive: true, schrijver: 'Remy Verberkt', competition: this.competition});
    }

    async editHeadline(headline: IHeadline) {
        const modal = await this.modalController.create({
            component: EditHeadlineComponent,
            swipeToClose: true,
            presentingElement: this.routerOutlet.nativeEl,
            componentProps: {
                headline,
            }
        });

        modal.onDidDismiss().then((event) => {
            if (event.data) {
            }
        });

        return await modal.present();
    }

    ngOnDestroy(): void {
        this.unsubscribe.next();
        this.unsubscribe.unsubscribe();
    }
}
