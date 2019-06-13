import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {tap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {ToastService} from '../services/toast.service';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

    constructor(private toastService: ToastService) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(tap((event: HttpEvent<any>) => {
        }, (err: any) => {
            if (err instanceof HttpErrorResponse) {
                this.toastService.presentToast(err.error.message ? err.error.message : 'Er is iets misgegaan', 'warning');
            }
        }));
    }
}
