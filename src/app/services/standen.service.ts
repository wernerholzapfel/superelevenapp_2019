import { Injectable } from '@angular/core';
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

  getTeamStand(predictionid): Observable<RankingTeam[]> {
    return this.http.get<RankingTeam[]>(`${environment.apiBaseUrl}/team-prediction/prediction/${predictionid}/stand`);
  }
}
