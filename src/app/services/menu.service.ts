import {Injectable} from '@angular/core';
import {AuthService} from './auth.service';

export interface MenuItem {
    title: string;
    url: string;
    icon: string;
    active: boolean;
    onlyForAdmin: boolean;
    onlyForUser: boolean;
}

@Injectable({
    providedIn: 'root'
})

export class MenuService {

    constructor(private authService: AuthService) {
    }

    public appPages: MenuItem[] = [
        {
            title: 'Home',
            url: '/home',
            icon: 'home',
            active: true,
            onlyForAdmin: false,
            onlyForUser: false
        }, {
            title: 'Mijn voorspelling',
            url: '/prediction',
            icon: 'podium',
            active: false,
            onlyForAdmin: false,
            onlyForUser: true
        }, {
            title: 'Standen',
            url: '/standen',
            icon: 'medal',
            active: false,
            onlyForAdmin: true,
            onlyForUser: false

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
            onlyForUser: false
        }, {
            title: 'Spelregels',
            url: '/spelregels',
            icon: 'information-circle',
            active: false,
            onlyForAdmin: false,
            onlyForUser: false
        }, {
            title: 'Profiel',
            url: '/profile',
            icon: 'person',
            active: false,
            onlyForAdmin: false,
            onlyForUser: true
        }
    ];

    showMenuItem(item: MenuItem) {
        return item.onlyForAdmin ? this.authService.isAdmin :
            item.onlyForUser ? this.authService.user : true;
    }

}
