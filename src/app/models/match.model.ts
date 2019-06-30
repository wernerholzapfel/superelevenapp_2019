import {Competition, Prediction} from './competition.model';

export interface Match {
    id?: string;
    homeTeam: string;
    awayTeam: string;
    homeScore?: number;
    awayScore?: number;
    roundId?: number;
}


export interface MatchPrediction {
    id?: string;
    homeScore: number;
    awayScore: number;
    match: Match;
    competition: Competition;
    prediction: Prediction;
}
