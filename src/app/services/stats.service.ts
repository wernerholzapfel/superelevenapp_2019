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


    createStats(competitionId: string, predictionId: string): Observable<RankingTeam[]> {
        return this.http.post<RankingTeam[]>(`${environment.apiBaseUrl}/team-player/stats`, {competitionId, predictionId});
    }

    createStatsForRound(competitionId: string, predictionId: string, roundId: string): Observable<RankingTeam[]> {
        return this.http.post<RankingTeam[]>(`${environment.apiBaseUrl}/team-player/roundstats`, {competitionId, predictionId, roundId});
    }
}
