import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {RankingTeam, Round} from '../models/prediction.model';
import {Match, MatchPrediction} from '../models/match.model';
import {Question, QuestionPrediction} from '../models/question.model';

@Injectable({
    providedIn: 'root'
})
export class PredictionService {

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

    getMatches(predictionId): Observable<Match[]> {
        return this.http.get<Match[]>(`${environment.apiBaseUrl}/match/prediction/${predictionId}`);
    }

    getMatchPredictions(predictionId): Observable<MatchPrediction[]> {
        return this.http.get<MatchPrediction[]>(`${environment.apiBaseUrl}/match-prediction/prediction/${predictionId}`);
    }

    saveMatchPredictions(matchPredictions: MatchPrediction[]): Observable<any> {
        return this.http.post<RankingTeam[]>(`${environment.apiBaseUrl}/match-prediction`, matchPredictions);
    }

    getQuestions(predictionId): Observable<Question[]> {
        return this.http.get<Question[]>(`${environment.apiBaseUrl}/question/prediction/${predictionId}`);
    }

    getQuestionPredictions(predictionId): Observable<QuestionPrediction[]> {
        return this.http.get<QuestionPrediction[]>(`${environment.apiBaseUrl}/question-prediction/prediction/${predictionId}`);
    }

    saveQuestionPredictions(questionPredictions: QuestionPrediction[]): Observable<any> {
        return this.http.post<RankingTeam[]>(`${environment.apiBaseUrl}/question-prediction`, questionPredictions);
    }

    getTeamPrediction(predictionId): Observable<QuestionPrediction[]> {
        return this.http.get<QuestionPrediction[]>(`${environment.apiBaseUrl}/team-prediction/prediction/${predictionId}`);
    }

    saveTeamPredictions(teamPredictions: any[]): Observable<any> {
        return this.http.post<any[]>(`${environment.apiBaseUrl}/team-prediction`, teamPredictions);
    }
}
