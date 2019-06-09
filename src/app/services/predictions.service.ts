import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {RankingTeam} from '../models/prediction.model';

@Injectable({
    providedIn: 'root'
})
export class PredictionsService {

    constructor(private http: HttpClient) {
    }

    getRankingTeams(competitionId): Observable<RankingTeam[]> {
        return this.http.get<RankingTeam[]>(`${environment.apiBaseUrl}/rankingteam/competitionid/${competitionId}`);
    }

    getRankingTeamsPrediction(competitionId): Observable<RankingTeam[]> {
        return this.http.get<RankingTeam[]>(`${environment.apiBaseUrl}/rankingprediction/competitionid/${competitionId}`);
    }

    saveRankingPredictions(rankingPredictions: RankingTeam[]): Observable<any> {
        return this.http.post<RankingTeam[]>(`${environment.apiBaseUrl}/rankingprediction`, rankingPredictions);
    }

}
