import {Competition, Prediction} from './competition.model';
import {Round} from './prediction.model';

export interface Match {
    id?: string;
    homeTeam: string;
    awayTeam: string;
    homeScore?: number;
    awayScore?: number;
    round?: Round;
    date: string;
}


export interface MatchPrediction {
    id?: string;
    homeScore: number;
    awayScore: number;
    punten?: number;
    match: Match;
    competition: Competition;
    prediction: Prediction;
}
