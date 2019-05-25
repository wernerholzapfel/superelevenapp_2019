import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {IParticipant} from '../models/participant.model';
import {map} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class ParticipantService {

  constructor(private http: HttpClient) {
  }

  postParticipant(body: IParticipant): Observable<IParticipant> {
    return this.http.post<IParticipant>(`${environment.apiBaseUrl}/participants`, body)
      .pipe(map(res => res as IParticipant));
  }
}
