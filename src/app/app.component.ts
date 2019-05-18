import {Component} from '@angular/core';

import {Platform} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html'
})
export class AppComponent {
    public appPages = [
        {
            title: 'Home',
            url: '/home',
            icon: 'home'
        },
        {
            title: 'Totaalstand',
            url: '/list',
            icon: 'list'
        }, {
            title: 'Teamstand',
            url: '/stand',
            icon: 'list'
        }, {
            title: 'Wedstrijdenstand',
            url: '/stand',
            icon: 'list'
        }, {
            title: 'Vragenstand',
            url: '/stand',
            icon: 'list'
        }, {
            title: 'Competitiestand',
            url: '/stand',
            icon: 'list'
        }, {
            title: 'Punten per voetballer',
            url: '/stand',
            icon: 'list'
        }, {
            title: 'Gekozen voetballers',
            url: '/stand',
            icon: 'list'
        }, {
            title: 'Deelnemers',
            url: '/stand',
            icon: 'list'
        }
    ];

    constructor(
        private platform: Platform,
        private splashScreen: SplashScreen,
        private statusBar: StatusBar
    ) {
        this.initializeApp();
    }

    initializeApp() {
        this.platform.ready().then(() => {
            this.statusBar.styleDefault();
            this.splashScreen.hide();
        });
    }
}
