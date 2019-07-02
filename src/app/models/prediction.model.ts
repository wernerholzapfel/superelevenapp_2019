import {Team} from './team.model';

export interface RankingTeam {
    id: string;
    position?: any;
    roundId?: any;
    team: Team;
    competition: IdObject;
    participant: IdObject;
    prediction: IdObject;
}

interface IdObject {
    id: string;
}
