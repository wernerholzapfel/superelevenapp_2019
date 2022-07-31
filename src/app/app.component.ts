import {Component, OnDestroy, OnInit} from '@angular/core';

import {Platform} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {IAppState} from './store/store';
import {Store} from '@ngrx/store';
import * as fromCompetition from './store/competition/competition.actions';
import {NavigationEnd, Router, RouterEvent} from '@angular/router';
import {MenuService} from './services/menu.service';
import {OneSignal} from '@ionic-native/onesignal/ngx';
import {environment} from '../environments/environment';
import {AuthService} from './services/auth.service';
import {combineLatest, Observable, of, Subject} from 'rxjs';
import {mergeMap, skip, take, takeUntil} from 'rxjs/operators';
import {getCompetition} from './store/competition/competition.reducer';
import {AngularFireDatabase} from '@angular/fire/database';
import {UiService} from './ui.service';
import {PredictionType} from './models/competition.model';
import {ToastService} from './services/toast.service';
import {CodePush, InstallMode} from '@ionic-native/code-push/ngx';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['./app.component.scss'],

})
export class AppComponent implements OnInit, OnDestroy {

    constructor(private store: Store<IAppState>,
                private platform: Platform,
                private splashScreen: SplashScreen,
                private statusBar: StatusBar,
                private router: Router,
                public menuService: MenuService,
                private oneSignal: OneSignal,
                private db: AngularFireDatabase,
                private uiService: UiService,
                private authService: AuthService,
                private toastService: ToastService,
                private codePush: CodePush,
    ) {
        this.initializeApp();

    }

    unsubscribe = new Subject<void>();

    isLoggedIn$: Observable<firebase.User> = this.authService.user$;


    initializeApp() {
        this.platform.ready().then(() => {
            this.statusBar.styleDefault();
            this.splashScreen.hide();

            if (this.platform.is('cordova')) {
                this.setupPush();
                this.checkCodePush();
            }
        });
    }

    setupPush() {
        // I recommend to put these into your environment.ts
        this.oneSignal.startInit(environment.oneSignal.appId, environment.oneSignal.googleProjectNumber);

        this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.None);

        // Notifcation was received in general
        this.oneSignal.handleNotificationReceived().subscribe(data => {
            const msg = data.payload.body;
            const title = data.payload.title;
            const additionalData = data.payload.additionalData;
        });

        // Notification was really clicked/opened
        this.oneSignal.handleNotificationOpened().subscribe(data => {
            // Just a note that the data is a different place here!
            const additionalData = data.notification.payload.additionalData;

        });

        this.oneSignal.endInit();
    }

    checkCodePush() {
        const downloadProgress = (progress) => {
            // this.uiService.isLoading$.next(progress.receivedBytes !== progress.totalBytes);
            console.log(`Bezig met update, ${progress.receivedBytes} van ${progress.totalBytes} gedownload`);
        };

        this.codePush.sync({
            updateDialog: {
                appendReleaseDescription: false,
                updateTitle: 'Super eleven update',
                mandatoryUpdateMessage: 'Er is een nieuwe update beschikbaar',
                mandatoryContinueButtonLabel: 'Installeer update'
            },
            deploymentKey: this.platform.is('ios') ? environment.iOSCodePush : environment.androidCodePush,
            installMode: InstallMode.IMMEDIATE
        }, downloadProgress).pipe(take(1)).subscribe(
            (syncStatus) => {
                console.log('CODE PUSH SYNCSTATUS: ' + syncStatus);
            },
            (error) => {
                console.error('CODE PUSH ERROR: ' + error);
            });
    }


    ngOnInit(): void {
        this.platform.resume.subscribe(() => {
            if (this.platform.is('cordova')) {
                this.checkCodePush();
            }
        });

        this.uiService.lastUpdated$.pipe(takeUntil(this.unsubscribe), skip(2))
            .subscribe(lastupdated => {
                this.toastService.presentToast('De stand is geupdate');
            });

        this.store.dispatch(new fromCompetition.FetchCompetitionList());

        // set linkactive.
        this.router.events.pipe(takeUntil(this.unsubscribe)).subscribe((event: RouterEvent) => {
            if (event instanceof NavigationEnd) {
                this.menuService.appPages.map(p => {
                    return Object.assign(p, {active: (event.url.startsWith(p.url))});
                });
            }
        });

        this.store.select(getCompetition).pipe(takeUntil(this.unsubscribe), mergeMap(competition => {
            if (competition && competition.predictions) {
                const matchPredictionId = competition.predictions.find(
                    prediction => prediction.predictionType === PredictionType.Matches).id;
                const rankingPredictionId = competition.predictions.find(
                    prediction => prediction.predictionType === PredictionType.Ranking).id;
                const questionPredictionId = competition.predictions.find(
                    prediction => prediction.predictionType === PredictionType.Questions).id;

                return combineLatest([
                    this.db.list<any>(`${competition.id}/totaalstand/totaal`).valueChanges(),
                    this.db.list<any>(`${competition.id}/${matchPredictionId}/${PredictionType.Matches}/totaal`).valueChanges(),
                    this.db.list<any>(`${competition.id}/${rankingPredictionId}/${PredictionType.Ranking}/totaal`).valueChanges(),
                    this.db.list<any>(`${competition.id}/${questionPredictionId}/${PredictionType.Questions}/totaal`).valueChanges(),
                    this.db.object<any>(`${competition.id}/lastUpdated`).valueChanges()]);
            } else {
                return of([]);
            }
        }))
            .pipe(takeUntil(this.unsubscribe))
            .subscribe(([totaalstand, wedstrijdenstand, rankingStand, questionStand, lastUpdated]) => {
                if (lastUpdated && totaalstand && wedstrijdenstand) {
                    this.uiService.totaalstand$.next(totaalstand);
                    this.uiService.wedstrijdstand$.next(wedstrijdenstand);
                    this.uiService.rankingstand$.next(rankingStand);
                    this.uiService.questionstand$.next(questionStand);
                    this.uiService.lastUpdated$.next(lastUpdated);
                }
            });
    }

    logout() {
        this.authService.logout();
    }


    ngOnDestroy(): void {
        this.unsubscribe.next();
        this.unsubscribe.unsubscribe();
    }
}
