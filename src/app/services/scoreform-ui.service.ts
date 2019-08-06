import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Teamplayer, TeamplayerResponse} from '../models/teamplayer.model';

@Injectable({
    providedIn: 'root'
})
export class ScoreformUiService {

    constructor() {
    }

    scoreformPlayersList$: BehaviorSubject<TeamplayerResponse[]> = new BehaviorSubject([]);
    scoreformTeamList$: BehaviorSubject<{ id: string, win: boolean, draw: boolean, cleansheet: boolean }[]> = new BehaviorSubject([]);


    filterPlayers(searchTerm: string, teamname: string, players: TeamplayerResponse[] | Teamplayer[]): any[] {
        if ((searchTerm === undefined && searchTerm.length < 2 && !teamname)) {
            return players;
        } else {
            searchTerm = searchTerm.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
            return players.filter(player => {
                const searchableWords: string[] = (player.player.name + ' ' + player.team.name)
                    .toLowerCase()
                    .normalize('NFD')
                    .replace(/[\u0300-\u036f]/g, '')
                    .split(' ');

                return (!searchTerm || searchTerm
                        .trim()
                        .split(' ')
                        .map(word => word)
                        .filter(searchWord => {
                            return searchableWords.filter(searchableWord => {
                                return searchableWord.indexOf(searchWord.trim()) > -1;
                            }).length > 0;
                        }).length > 0)
                    && (!teamname || player.team.name === teamname);

            });
        }
    }

}
