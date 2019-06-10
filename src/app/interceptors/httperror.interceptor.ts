import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {tap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {ToastController} from '@ionic/angular';

@Injectable()
export class HttperrorInterceptor implements HttpInterceptor {

    constructor(private toastController: ToastController) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(tap((event: HttpEvent<any>) => {
        }, (err: any) => {
            if (err instanceof HttpErrorResponse) {
                this.presentToast(err.error.message ? err.error.message : 'Er is iets misgegaan');
            }
        }));
    }

    async presentToast(message: string, duration?: number) {
        duration = duration ? duration : 2000;
        const toast = await this.toastController.create({
            color: 'warning',
            message,
            duration,
            showCloseButton: true,
            closeButtonText: 'X'
        });
        toast.present();
    }
}
