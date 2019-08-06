import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {RankingTeam} from '../models/prediction.model';
import {environment} from '../../environments/environment';
import {TeamplayerResponse} from '../models/teamplayer.model';

@Injectable({
    providedIn: 'root'
})
export class PlayerService {

    constructor(private http: HttpClient) {
    }

    getPlayersByPredictionId(predictionId: string): Observable<RankingTeam[]> {
        return this.http.get<RankingTeam[]>(`${environment.apiBaseUrl}/team-player/prediction/${predictionId}`);
    }

    getPlayersScore(predictionId: string, roundId: string): Observable<TeamplayerResponse[]> {
        return this.http.get<TeamplayerResponse[]>(`${environment.apiBaseUrl}/team-player/prediction/${predictionId}/round/${roundId}`);
    }

}
