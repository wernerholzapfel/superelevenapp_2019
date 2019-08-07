import {Team} from './team.model';

export interface RankingTeam {
    id: string;
    position?: any;
    roundId?: any;
    team: Team;
    competition: IdObject;
    participant: IdObject;
    prediction: IdObject;
    rounds: Round[];
}

interface IdObject {
    id: string;
}

export interface Round {
    id: string;
    name: string;
}
