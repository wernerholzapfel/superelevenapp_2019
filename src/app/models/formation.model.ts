import {Player, PositionType, Teamplayer} from './teamplayer.model';
import {Team} from './team.model';

export interface Formation {
    index: number;
    position: PositionType;
    class: string[];
    disable: boolean;
    hide: boolean;
    players: FormationPlayer[];
}

export interface FormationPlayer {
    id: string;
    index: number;
    selected: boolean;
    initialClass: string[];
    class: string[];
    hide: boolean;
    position: PositionType;
    player: Player;
    team?: Team;
    captain?: boolean;
    isNew?: boolean;
}
