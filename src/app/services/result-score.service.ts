import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';
import {RankingTeam} from '../models/prediction.model';

@Injectable({
    providedIn: 'root'
})
export class ResultScoreService {

    constructor(private http: HttpClient) {
    }

    postTeamplayerScore(body: any): Observable<any> {
        return this.http.post<any>(`${environment.apiBaseUrl}/teamplayer-scores`, body)
            .pipe(map(res => res as any));
    }

    postMatchResult(body: any): Observable<any> {
        return this.http.post<any>(`${environment.apiBaseUrl}/match`, body)
            .pipe(map(res => res as any));
    }

    postRankingResults(body: RankingTeam[]): Observable<any[]> {
        return this.http.post<RankingTeam[]>(`${environment.apiBaseUrl}/rankingteam`, body)
            .pipe(map(res => res as RankingTeam[]));
    }

    getRankingTeamsResults(competitionId): Observable<RankingTeam[]> {
        return this.http.get<RankingTeam[]>(`${environment.apiBaseUrl}/rankingteam/results/competitionid/${competitionId}`);
    }
}
