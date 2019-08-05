import {Team} from './team.model';

export interface TeamPlayer {
    id?: string;
    position?: PositionType;
    active?: boolean;
    player?: Player;
    team?: Team;
    teamplayerscores?: {
        played: boolean,
        win: boolean,
        draw: boolean,
        cleansheet: boolean,
        yellow: boolean,
        secondyellow: boolean,
        red: boolean,
        penaltymissed: number,
        penaltystopped: number,
        goals: number,
        assists: number
        owngoal: number
    };
}

export interface Player {
    id: string;
    playerReference: number;
    teamReference: number;
    team: number;
    name: string;
    dateOfBirth: string;
    countryOfBirth: string;
    nationality: string;
    position: string;
}

export enum PositionType {
    Goalkeeper = 'Goalkeeper',
    Defender = 'Defender',
    Midfielder = 'Midfielder',
    Attacker = 'Attacker'
}


