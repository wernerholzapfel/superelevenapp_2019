import {Competition, Prediction} from './competition.model';
import {Round} from './prediction.model';
import {IParticipant} from './participant.model';
import {QuestionCorrect} from '../components/question-result-form/question-result-form.component';

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
    participant?: IParticipant;
    round?: Round;
    punten?: number;
    correct?: QuestionCorrect;
}
