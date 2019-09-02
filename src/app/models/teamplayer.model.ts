import {Team} from './team.model';
import {Competition, Prediction} from './competition.model';

export interface Teamplayer {
    id?: string;
    position?: PositionType;
    active?: boolean;
    isSelected?: boolean;
    player?: Player;
    team?: Team;
    teamplayerscores?: TeamplayerScore;
}

export interface TeamplayerScore {
    id?: string;
    played: boolean;
    win: boolean;
    draw: boolean;
    cleansheet: boolean;
    yellow: boolean;
    secondyellow: boolean;
    red: boolean;
    penaltymissed: number;
    penaltystopped: number;
    goals: number;
    assists: number;
    owngoal: number;
}

export interface TeamplayerResponse extends Teamplayer {
    teamplayerscores: TeamplayerScore;
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
    captain?: boolean;
}

export enum PositionType {
    Goalkeeper = 'Goalkeeper',
    Defender = 'Defender',
    Midfielder = 'Midfielder',
    Attacker = 'Attacker'
}


