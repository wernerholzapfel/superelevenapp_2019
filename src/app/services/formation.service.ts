import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {Formation} from '../models/formation.model';
import {PositionType} from '../models/teamplayer.model';

@Injectable({
    providedIn: 'root'
})
export class FormationService {

    constructor() {
    }

    getFormation(): Observable<any[]> {

        return of([
            {
                position: PositionType.Attacker,
                class: ['forward', 'text-center', 'justify-content-center'],
                disable: false,
                hide: false,
                index: 0,
                players: [{
                    index: 0,
                    player: {name: 'Kies'},
                    selected: false,
                    hide: false,
                    initialClass: ['text-center'],
                    class: ['text-center']
                }],
            },
            {
                position: PositionType.Attacker,
                class: ['forward', 'formation-line'],
                disable: false,
                hide: false,
                index: 1,
                players: [{
                    index: 0,
                    player: {name: 'Kies'},
                    selected: false,
                    hide: false,
                    initialClass: ['text-left'],
                    class: ['text-left']
                }, {
                    index: 1, player: {name: 'Kies'},
                    selected: false,
                    hide: false,
                    initialClass: ['text-right'],
                    class: ['text-right']
                }]
            },
            {
                position: PositionType.Midfielder,
                class: ['midfielder'],
                disable: false,
                hide: false,
                index: 2,
                players: [{
                    index: 0, player: {name: 'Kies'},
                    selected: false,
                    hide: false,
                    initialClass: ['text-center'],
                    class: ['text-center'],
                }]
            },
            {
                position: PositionType.Midfielder,
                class: [],
                disable: false,
                hide: false,
                index: 3,
                players: [{
                    index: 0, player: {name: 'Kies'},
                    selected: false,
                    hide: false,
                    initialClass: ['text-left'],
                    class: ['text-left'],
                }, {
                    index: 1,
                    player: {name: 'Kies'},
                    selected: false,
                    hide: false,
                    initialClass: ['text-right'],
                    class: ['text-right'],
                }]
            },
            {
                position: PositionType.Midfielder,
                class: ['formation-line'],
                disable: false,
                hide: false,
                index: 4,
                players: [{
                    index: 0, player: {name: 'Kies'},
                    selected: false,
                    hide: false,
                    initialClass: ['text-center'],
                    class: ['text-center'],
                }]
            },
            {
                position: PositionType.Defender,
                class: [],
                disable: false,
                hide: false,
                index: 5,
                players: [{
                    index: 0, player: {name: 'Kies'},
                    selected: false,
                    hide: false,
                    initialClass: ['text-left'],
                    class: ['text-left'],
                }, {
                    index: 1,
                    player: {name: 'Kies'},
                    selected: false,
                    hide: false,
                    initialClass: ['text-right'],
                    class: ['text-right']
                }]
            },
            {
                position: PositionType.Defender,
                class: ['formation-line'],
                disable: false,
                hide: false,
                index: 6,
                players: [{
                    index: 0, player: {name: 'Kies'},
                    selected: false,
                    hide: false,
                    initialClass: ['text-right'],
                    class: ['text-right'],
                }, {
                    index: 1,
                    player: {name: 'Kies'},
                    selected: false,
                    hide: false,
                    initialClass: ['text-left'],
                    class: ['text-left'],
                }]
            },
            {
                position: PositionType.Goalkeeper,
                class: ['forward', 'text.center'],
                disable: false,
                hide: false,
                index: 7,
                players: [{
                    index: 0, player: {name: 'Kies'},
                    selected: false,
                    hide: false,
                    initialClass: ['text-center'],
                    class: ['text-center'],
                }]
            },
        ]);
    }
}
