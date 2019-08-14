import {Component, OnInit} from '@angular/core';

import {Platform} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {IAppState} from './store/store';
import {Store} from '@ngrx/store';
import * as fromCompetition from './store/competition/competition.actions';
import {NavigationEnd, Router, RouterEvent} from '@angular/router';
import {MenuService} from './services/menu.service';

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
