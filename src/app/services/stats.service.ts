import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {RankingTeam} from '../models/prediction.model';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StatsService {

  constructor(private http: HttpClient) { }


  getStats(predictionid): Observable<RankingTeam[]> {
    return this.http.get<RankingTeam[]>(`${environment.apiBaseUrl}/team-player/prediction/${predictionid}/stats`);
  }
}
