import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-team',
  templateUrl: './team.page.html',
  styleUrls: ['./team.page.scss'],
})
export class TeamPage implements OnInit {

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
