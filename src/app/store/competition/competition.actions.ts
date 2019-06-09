import {Action} from '@ngrx/store';
import {HttpErrorResponse} from '@angular/common/http';
import {Competition} from '../../models/competition.model';

export const FETCH_COMPETITIONLIST = '[COMPETITION] Fetch Competitionlist';
export const FETCH_COMPETITIONLIST_SUCCESS = '[COMPETITION] Fetch Competitionlist Success';
export const FETCH_COMPETITIONLIST_FAILURE = '[COMPETITION] Fetch Competitionlist Failure';
export const FETCH_COMPETITION = '[COMPETITION] Fetch Competition';
export const FETCH_COMPETITION_BY_ID = '[COMPETITION] Fetch Competition by id';
export const FETCH_COMPETITION_SUCCESS = '[COMPETITION] Fetch Competition Success';
export const FETCH_COMPETITION_FAILURE = '[COMPETITION] Fetch Competition Failure';

export class FetchCompetitionList implements Action {
  readonly type = FETCH_COMPETITIONLIST;

  constructor() {
  }
}

export class FetchCompetitionListSuccess implements Action {
  readonly type = FETCH_COMPETITIONLIST_SUCCESS;

  constructor(public payload: Competition[]) {
  }
}

export class FetchCompetitionListFailure implements Action {
  readonly type = FETCH_COMPETITIONLIST_FAILURE;

  constructor(public payload: HttpErrorResponse) {
  }
}

export class FetchCompetition implements Action {
  readonly type = FETCH_COMPETITION;

  constructor() {
  }
}

export class FetchCompetitionSuccess implements Action {
  readonly type = FETCH_COMPETITION_SUCCESS;

  constructor(public payload: Competition) {
  }
}

export class FetchCompetitionFailure implements Action {
  readonly type = FETCH_COMPETITION_FAILURE;

  constructor(public payload: HttpErrorResponse) {
  }
}


export class FetchCompetitionById implements Action {
  readonly type = FETCH_COMPETITION_BY_ID;

  constructor(public payload: string) {
  }
}



