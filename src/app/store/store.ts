import {ActionReducerMap, MetaReducer} from '@ngrx/store';
import {competitionReducer, CompetitionState} from './competition/competition.reducer';
import {CompetitionEffects} from './competition/competition.effects';
import {environment} from '../../environments/environment';

export interface IAppState {
    competitions: CompetitionState;
}

export const reducers: ActionReducerMap<IAppState> = {
    competitions: competitionReducer
};

export const effects = [
    CompetitionEffects
];

export const metaReducers: MetaReducer<IAppState>[] = !environment.production ? [] : [];
