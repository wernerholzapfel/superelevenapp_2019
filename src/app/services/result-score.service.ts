import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {IParticipant} from '../models/participant.model';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ResultScoreService {

  constructor(private http: HttpClient) { }

  postTeamplayerScore(body: any): Observable<any> {
    return this.http.post<any>(`${environment.apiBaseUrl}/teamplayer-scores`, body)
        .pipe(map(res => res as any));
  }

  postMatchResult(body: any): Observable<any> {
    return this.http.post<any>(`${environment.apiBaseUrl}/match`, body)
        .pipe(map(res => res as any));
  }
}
