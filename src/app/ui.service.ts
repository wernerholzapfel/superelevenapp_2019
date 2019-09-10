import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UiService {

  stats$: BehaviorSubject<any[]> = new BehaviorSubject([]);

  constructor() { }


}
