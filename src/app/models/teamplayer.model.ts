import {Team} from './team.model';

export interface TeamPlayer {
    id?: string;
    position?: PositionType;
    active?: boolean;
    player?: Player;
    team?: Team;
}

export interface Player {
    id: string;
    firstname: string;
    lastname: string;
}

export enum PositionType {
    Keeper = 'Keeper',
    Defender = 'Defender',
    Midfielder = 'Midfielder',
    Forward = 'Forward'
}


