import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class MenuService {

    constructor() {
    }

    public appPages = [
        {
            title: 'Home',
            url: '/home',
            icon: 'home',
            active: true
        },
        {
            title: 'Voorspelling',
            url: '/prediction',
            icon: 'podium',
            active: false
        },
        {
            title: 'Standen',
            url: '/standen',
            icon: 'medal',
            active: false
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
            active: false
        }
    ];
}
