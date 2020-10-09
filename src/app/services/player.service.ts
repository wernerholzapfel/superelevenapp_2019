import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {RankingTeam} from '../models/prediction.model';
import {environment} from '../../environments/environment';
import {Teamplayer, TeamplayerResponse} from '../models/teamplayer.model';
import {Team} from '../models/team.model';

@Injectable({
    providedIn: 'root'
})
export class PlayerService {

    constructor(private http: HttpClient) {
    }

    getPlayersByPredictionId(predictionId: string): Observable<RankingTeam[]> {
        return this.http.get<RankingTeam[]>(`${environment.apiBaseUrl}/team-player/prediction/${predictionId}`);
    }


    updatePlayer(player: Teamplayer): Observable<Teamplayer> {
        return this.http.put<Teamplayer>(`${environment.apiBaseUrl}/team-player/${player.id}`, player)
    }

    getPlayersScore(predictionId: string, roundId: string): Observable<TeamplayerResponse[]> {
        return this.http.get<TeamplayerResponse[]>(`${environment.apiBaseUrl}/team-player/prediction/${predictionId}/round/${roundId}`);
    }

}
