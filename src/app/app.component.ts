import {Component, OnInit} from '@angular/core';

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

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['./app.component.scss'],

})
export class AppComponent implements OnInit {


    constructor(private store: Store<IAppState>,
                private platform: Platform,
                private splashScreen: SplashScreen,
                private statusBar: StatusBar,
                private router: Router,
                public menuService: MenuService,
                private oneSignal: OneSignal,
    ) {
        this.initializeApp();

    }

    initializeApp() {
        this.platform.ready().then(() => {
            this.statusBar.styleDefault();
            this.splashScreen.hide();

            if (this.platform.is('cordova')) {
                this.setupPush();
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

    ngOnInit(): void {
        this.store.dispatch(new fromCompetition.FetchCompetitionList());

        // set linkactive.
        this.router.events.subscribe((event: RouterEvent) => {
            if (event instanceof NavigationEnd) {
                this.menuService.appPages.map(p => {
                    return Object.assign(p, {active: (event.url.startsWith(p.url))});
                });
            }
        });
    }

    showMenuItem(item) {
        return this.menuService.showMenuItem(item);
    }
}
