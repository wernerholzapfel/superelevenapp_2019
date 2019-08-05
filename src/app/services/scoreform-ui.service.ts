import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {TeamPlayer} from '../models/teamplayer.model';

@Injectable({
  providedIn: 'root'
})
export class ScoreformUiService {

  constructor() { }

      scoreformPlayersList$: BehaviorSubject<TeamPlayer[]> = new BehaviorSubject([]);
      scoreformTeamList$: BehaviorSubject<{ id: string, win: boolean, draw: boolean, cleansheet: boolean }[]> = new BehaviorSubject([]);


}
