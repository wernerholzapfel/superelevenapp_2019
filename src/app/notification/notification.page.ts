import { Component, OnInit } from '@angular/core';
import {ToastController} from '@ionic/angular';
import {PushNotificationService} from '../services/push-notification.service';
import {ToastService} from '../services/toast.service';


@Component({
  selector: 'app-notification',
  templateUrl: './notification.page.html',
  styleUrls: ['./notification.page.scss'],
})
export class NotificationPage {


  public toast: HTMLIonToastElement;
  public pushMessage = 'De stand is bijgewerkt';

  constructor(
      private pushNotificationService: PushNotificationService,
      private toastService: ToastService
  ) {
  }

  sendNotification() {
    this.pushNotificationService.sendPushNotificationToAll({content: this.pushMessage}).subscribe(response => {
      this.toastService.presentToast(
          `bericht verstuurd naar ${response.recipients} mensen`);
    }, error => {
      // this.errorService.handleError(error);
    });
  }

}
