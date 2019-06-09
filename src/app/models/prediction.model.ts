export interface Team {
    id: string;
    name: string;
    logoUrl: string;
    team?: Team;
}

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
