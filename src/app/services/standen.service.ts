import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {RankingTeam} from '../models/prediction.model';
import {environment} from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class StandenService {

    constructor(private http: HttpClient) {
    }

    createTeamStand(competitionId, predictionId: string): Observable<RankingTeam[]> {
        return this.http.post<RankingTeam[]>(`${environment.apiBaseUrl}/team-prediction/stand`, {competitionId, predictionId});
    }

    createRoundTeamStand(competitionId: string, predictionId: string, roundId: string): Observable<RankingTeam[]> {
        return this.http.post<RankingTeam[]>(`${environment.apiBaseUrl}/team-prediction/roundstand`, {
            competitionId,
            predictionId,
            roundId
        });
    }

    createMatchesStand(competitionId: string, predictionId: string): Observable<any[]> {
        return this.http.post<any[]>(`${environment.apiBaseUrl}/stand/match/create`, {competitionId, predictionId});
    }
    createTotalStand(competitionId: string): Observable<any[]> {
        return this.http.post<any[]>(`${environment.apiBaseUrl}/stand/total/create`, {competitionId});
    }
    createRankingStand(competitionId: string, predictionId): Observable<any[]> {
        return this.http.post<any[]>(`${environment.apiBaseUrl}/stand/ranking/create`, {competitionId, predictionId});
    }
}
