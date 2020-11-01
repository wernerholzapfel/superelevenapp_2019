import {Injectable} from '@angular/core';

export interface MenuItem {
    title: string;
    url: string;
    icon: string;
    active: boolean;
    onlyForAdmin: boolean;
    onlyForUser: boolean;
    showAfterRegistration: boolean;
    show?: boolean;
}

@Injectable({
    providedIn: 'root'
})

export class MenuService {

    constructor() {
    }

    public appPages: MenuItem[] = [
        {
            title: 'Home',
            url: '/home',
            icon: 'home',
            active: true,
            onlyForAdmin: false,
            onlyForUser: false,
            showAfterRegistration: false,

        }, {
            title: 'Mijn voorspelling',
            url: '/prediction',
            icon: 'podium',
            active: false,
            onlyForAdmin: false,
            onlyForUser: true,
            showAfterRegistration: false,
        }, {
            title: 'Standen',
            url: '/standen',
            icon: 'medal',
            active: false,
            onlyForAdmin: false,
            onlyForUser: false,
            showAfterRegistration: true,

        }, {
            title: 'Statistieken',
            url: '/stats',
            icon: 'stats-chart',
            active: false,
            onlyForAdmin: false,
            onlyForUser: false,
            showAfterRegistration: true,

        },
        //  {
        //     title: 'Voorbereiding',
        //     url: '/preperation',
        //     icon: 'list',
        //     active: false
        // },
        {
            title: 'Uitslagen',
            url: '/results',
            icon: 'create',
            active: false,
            onlyForAdmin: true,
            onlyForUser: false,
            showAfterRegistration: false,

        }, {
            title: 'Spelregels',
            url: '/spelregels',
            icon: 'information-circle',
            active: false,
            onlyForAdmin: false,
            onlyForUser: false,
            showAfterRegistration: false,

        }, {
            title: 'Profiel',
            url: '/profile',
            icon: 'person',
            active: false,
            onlyForAdmin: false,
            onlyForUser: true,
            showAfterRegistration: false,

        }, {
            title: 'Notificatie',
            url: '/notification',
            icon: 'notifications',
            active: false,
            onlyForAdmin: true,
            onlyForUser: false,
            showAfterRegistration: false,
        }
    ];

    setMenu(admin: boolean, user, registrationOpen) {
        const show = this.appPages.map(item => {
            return {
                ...item,
                show: item.onlyForAdmin
                    ? admin
                    : item.onlyForUser
                        ? !!user
                        : item.showAfterRegistration
                            ? admin || !registrationOpen
                            : true
            };
        });

        this.appPages = show;
    }

}
