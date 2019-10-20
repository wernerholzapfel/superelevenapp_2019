import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';


export interface UpdateQuestion {
    questionId: string;
    answer: string;
    roundId: string;
}

@Injectable({
    providedIn: 'root'
})
export class QuestionService {

    constructor(private http: HttpClient) {
    }

    updateQuestion(body: UpdateQuestion): Observable<UpdateQuestion> {
        return this.http.put<UpdateQuestion>(`${environment.apiBaseUrl}/question`, body);
    }
}
