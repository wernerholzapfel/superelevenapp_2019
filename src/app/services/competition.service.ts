import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {Competition} from '../models/competition.model';
import {HttpClient} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class CompetitionService {

    constructor(private http: HttpClient) {
    }

    getCompetitions(): Observable<Competition[]> {
        return this.http.get<Competition[]>(`${environment.apiBaseUrl}/competition`);
    }
}
