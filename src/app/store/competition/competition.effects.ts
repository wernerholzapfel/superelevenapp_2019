import {Injectable} from '@angular/core';
import * as competition from './competition.actions';

import {CompetitionService} from '../../services/competition.service';
import {from, of} from 'rxjs';
import {catchError, switchMap} from 'rxjs/operators';
import {Actions, Effect, ofType} from '@ngrx/effects';

@Injectable()
export class CompetitionEffects {
    constructor(private actions$: Actions,
                private competitionService: CompetitionService) {
    }


    @Effect()
    fetchCompetitionList$ = this.actions$
        .pipe(
            ofType<competition.FetchCompetitionList>(competition.FETCH_COMPETITIONLIST),
            switchMap(action => {
                return this.competitionService
                    .getCompetitions()
                    .pipe(switchMap(competitionResponse =>
                            from([new competition.FetchCompetitionListSuccess(competitionResponse),
                                new competition.FetchCompetitionSuccess(competitionResponse[0])])
                        ),
                        catchError(err => of(new competition.FetchCompetitionListFailure(err))));
            }));

    // @Effect()
    // updateCompetition$ = this.actions$
    //   .ofType<competition.SetCurrentRiderAsSelected>(competition.FETCH_COMPETITION)
    //   .switchMap(action => Observable.of(new competition.FetchCompetitionSuccess(action.payload)))
    //   .catch(err => Observable.of(new competition.FetchCompetitionFailure(err)));

    // @Effect()
    // fetchCompetition$ = this.actions$
    //   .pipe(
    //     ofType<competition.FetchCompetition>(competition.FETCH_COMPETITION),
    //     switchMap(action => {
    //       return this.competitionService
    //         .getCompetitions()
    //         .pipe(switchMap(competitionResponse =>
    //             of(new competition.FetchCompetitionSuccess(competitionResponse))),
    //           catchError(err => of(new competition.FetchCompetitionFailure(err))));
    //     }));
    //
    // @Effect()
    // fetchCompetitionById$ = this.actions$
    //   .pipe(ofType<competition.FetchCompetitionById>(competition.FETCH_COMPETITION_BY_ID),
    //     switchMap(action => {
    //       return this.competitionService
    //         .getCompetitionById(action.payload)
    //         .pipe(switchMap(competitionResponse =>
    //             of(new competition.FetchCompetitionSuccess(competitionResponse))),
    //           catchError(err => of(new competition.FetchCompetitionFailure(err))));
    //     }));
    //
    // @Effect()
    // fetchCompetitionSuccess$ = this.actions$
    //   .pipe(ofType<competition.FetchCompetitionSuccess>(competition.FETCH_COMPETITION_SUCCESS),
    //     switchMap(action =>
    //       from([new etappe.FetchEtappeList(action.payload.id),
    //         new etappe.FetchLatestEtappe(action.payload.id),
    //         new competitionrider.FetchCompetitionriderList(action.payload.id)])),
    //     catchError(err => of(new competition.FetchCompetitionFailure(err))));
}
