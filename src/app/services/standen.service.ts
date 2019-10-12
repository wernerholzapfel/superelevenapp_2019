import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {RankingTeam} from '../models/prediction.model';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';
import {IHeadline} from '../models/headline.model';

@Injectable({
    providedIn: 'root'
})
export class StandenService {

    constructor(private http: HttpClient) {
    }

    getTeamStand(predictionid: string): Observable<RankingTeam[]> {
        return this.http.get<RankingTeam[]>(`${environment.apiBaseUrl}/team-prediction/prediction/${predictionid}/stand`);
    }

    getRoundTeamStand(predictionid: string, roundid: string): Observable<RankingTeam[]> {
        return this.http.get<RankingTeam[]>(`${environment.apiBaseUrl}/team-prediction/prediction/${predictionid}/round/${roundid}/stand`);
    }

    getMatchesStand(predictionid: string): Observable<any[]> {
        return this.http.get<any[]>(`${environment.apiBaseUrl}/stand/match/prediction/${predictionid}`);
    }
}
