import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Round} from '../models/prediction.model';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class RoundService {


    previousRoundId$: BehaviorSubject<string> = new BehaviorSubject('');
    allRounds$: BehaviorSubject<Round[]> = new BehaviorSubject([]);

    constructor(private http: HttpClient) {
    }

    getPreviousRound(): Observable<Round> {
        return this.http.get<Round>(`${environment.apiBaseUrl}/round/previous`);
    }


    getallRounds(competitionId: string): Observable<Round[]> {
        return this.http.get<Round[]>(`${environment.apiBaseUrl}/round/competition/${competitionId}`);
    }
}
