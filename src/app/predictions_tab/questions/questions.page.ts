import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.page.html',
  styleUrls: ['./questions.page.scss'],
})
export class QuestionsPage implements OnInit {

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
