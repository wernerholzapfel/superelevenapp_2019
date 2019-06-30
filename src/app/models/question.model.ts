import {Competition, Prediction} from './competition.model';

export interface Question {
    id?: string;
    question: string;
    answer: string;
    roundId: number;
    competition: Competition;
    prediction: Prediction;
}


export interface QuestionPrediction {
    id?: string;
    answer: string;
    question: Question;
    competition: Competition;
    prediction: Prediction;
}
