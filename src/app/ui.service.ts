import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UiService {

  stats$: BehaviorSubject<any[]> = new BehaviorSubject([]);
  totaalstand$: BehaviorSubject<any[]> = new BehaviorSubject([]);
  wedstrijdstand$: BehaviorSubject<any[]> = new BehaviorSubject([]);
  rankingstand$: BehaviorSubject<any[]> = new BehaviorSubject([]);
  lastUpdated$: BehaviorSubject<{lastUpdated: number}> = new BehaviorSubject(null);

  constructor() { }


}
