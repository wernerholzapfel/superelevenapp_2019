import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-matches',
  templateUrl: './matches.page.html',
  styleUrls: ['./matches.page.scss'],
})
export class MatchesPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  save() {
    console.log('todo save matches');
  }

  canISaveForm() {
    return false;
  }
}
