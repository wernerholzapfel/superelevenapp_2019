import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {IHeadline} from '../models/headline.model';
import {map} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class HeadlineService {

    constructor(private http: HttpClient) {
    }

    getHeadlines(tourId: string): Observable<IHeadline[]> {

        return this.http.get<IHeadline[]>(`${environment.apiBaseUrl}/headlines/${tourId}`);
    }

    saveHeadline(body: IHeadline): Observable<IHeadline> {
        return this.http.post<IHeadline>(`${environment.apiBaseUrl}/headlines`, body)
            .pipe(map(res => res as IHeadline));
    }
}
