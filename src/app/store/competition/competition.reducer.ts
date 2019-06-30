import {createSelector} from '@ngrx/store';
import * as competition from './competition.actions';
import {Competition} from '../../models/competition.model';
import {IAppState} from '../store';

export interface CompetitionState {
    competitions: Competition[];
    competition: Competition;
    inProgress: boolean;
    error: any;
}

const initalcompetitionState: CompetitionState = {
    competitions: undefined,
    competition: {
        name: undefined,
        id: undefined,
        endDate: null,
        startDate: null,
        isActive: undefined,
        deadline: undefined,
        hasEnded: undefined,
        predictions: undefined
    },
    error: undefined,
    inProgress: false,
};

export function competitionReducer(state = initalcompetitionState, action): CompetitionState {
    switch (action.type) {
        case competition.FETCH_COMPETITIONLIST:
        case competition.FETCH_COMPETITION:
        case competition.FETCH_COMPETITION_BY_ID:
            return {
                ...state,
                inProgress: true,
            };
        case competition.FETCH_COMPETITION_SUCCESS:
            return {
                ...state,
                // isRegistrationOpen: Date.parse(action.payload.deadline) >= Date.now(),
                competition: action.payload,
                inProgress: false,
                error: undefined
            };
        case competition.FETCH_COMPETITIONLIST_SUCCESS:
            return {
                ...state,
                competitions: action.payload,
                inProgress: false,
                error: undefined
            };
        case competition.FETCH_COMPETITIONLIST_FAILURE:
        case competition.FETCH_COMPETITION_FAILURE:
            return {
                ...state,
                competition: undefined,
                inProgress: false,
                error: action.payload,
            };
        default:
            return {
                ...state
            };
    }
}

export const getCompetitionsState = (state: IAppState) => state.competitions;

export const getCompetitions = createSelector(
    getCompetitionsState,
    (state: CompetitionState) => state.competitions
);

export const getCompetition = createSelector(
    getCompetitionsState,
    (state: CompetitionState) => state.competition
);

export const getPredictions = createSelector
(getCompetitionsState,
    (state: CompetitionState) => state.competition.predictions);
