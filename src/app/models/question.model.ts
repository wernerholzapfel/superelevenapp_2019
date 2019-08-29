import {Competition, Prediction} from './competition.model';
import {Round} from './prediction.model';

export interface Question {
    id?: string;
    question: string;
    answer: string;
    round: Round;
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
