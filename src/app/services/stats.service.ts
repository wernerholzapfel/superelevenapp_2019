import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {RankingTeam} from '../models/prediction.model';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {TeamplayerResponse} from '../models/teamplayer.model';

@Injectable({
    providedIn: 'root'
})
export class StatsService {
  playerList$: BehaviorSubject<TeamplayerResponse[]> = new BehaviorSubject([]);

    constructor(private http: HttpClient) {
    }


    getStats(predictionid): Observable<RankingTeam[]> {
        return this.http.get<RankingTeam[]>(`${environment.apiBaseUrl}/team-player/prediction/${predictionid}/stats`);
    }

    getStatsForRound(predictionid, roundId: string): Observable<RankingTeam[]> {
        return this.http.get<RankingTeam[]>(`${environment.apiBaseUrl}/team-player/stats/prediction/${predictionid}/round/${roundId}`);
    }
}
