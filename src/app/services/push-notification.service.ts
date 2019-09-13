import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';

interface Notification {
  content: string;
}

@Injectable({
  providedIn: 'root'
})
export class PushNotificationService {

  constructor(
      private httpClient: HttpClient
  ) {
  }

  sendPushNotificationToAll(notification: Notification): Observable<any> {
    return this.httpClient.post<Notification>(`${environment.apiBaseUrl}/notification`, notification);
  }
}
