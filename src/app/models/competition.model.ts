export interface Competition {
    id: string;
    name: string;
    startDate: Date;
    endDate: Date;
    deadline: Date;
    isActive: boolean;
    hasEnded: boolean;
    predictions: Prediction[];
}

export interface Prediction {
    id: string;
    predictionType: PredictionType;
}

export enum PredictionType {
    Matches = 'Matches',
    Ranking = 'Ranking',
    Team = 'Team',
    Questions = 'Questions'
}
