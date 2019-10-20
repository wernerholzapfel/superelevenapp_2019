import {Component, Input, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';

@Component({
  selector: 'app-question-score',
  templateUrl: './question-score.component.html',
  styleUrls: ['./question-score.component.scss'],
})
export class QuestionScoreComponent implements OnInit {

  @Input() participants: any[];
  @Input() index = 0;

  participant: any;

  constructor(private modalController: ModalController) {
  }

  ngOnInit() {
    if (this.participants) {
      this.participant = this.participants[this.index];
    }
  }

  async close() {
    await this.modalController.dismiss();
  }

  next() {
    this.index++;
    this.participant = this.participants[this.index];
  }

  previous() {
    this.index--;
    this.participant = this.participants[this.index];

  }
}
