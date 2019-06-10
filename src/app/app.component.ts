import {Component, OnInit} from '@angular/core';

import {Platform} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {IAppState} from './store/store';
import {Store} from '@ngrx/store';
import * as fromCompetition from './store/competition/competition.actions';
import {NavigationEnd, Router, RouterEvent} from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['./app.component.scss'],

})
export class AppComponent implements OnInit {
    public appPages = [
        {
            title: 'Home',
            url: '/home',
            icon: 'home',
            active: false
        },
        {
            title: 'Voorspelling',
            url: '/prediction',
            icon: 'list',
            active: false
        }
    ];

    constructor(private store: Store<IAppState>,
                private platform: Platform,
                private splashScreen: SplashScreen,
                private statusBar: StatusBar,
                private router: Router
    ) {
        this.initializeApp();

    }

    initializeApp() {
        this.platform.ready().then(() => {
            this.statusBar.styleDefault();
            this.splashScreen.hide();
        });
    }

    ngOnInit(): void {
        this.store.dispatch(new fromCompetition.FetchCompetitionList());

        // set linkactive.
        this.router.events.subscribe((event: RouterEvent) => {
            if (event instanceof NavigationEnd) {
                this.appPages.map(p => {
                    return Object.assign(p, {active: (event.url.startsWith(p.url))});
                });
            }
        });
    }
}
