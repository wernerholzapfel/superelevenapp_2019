import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {of} from 'rxjs';
import {AuthService} from '../services/auth.service';
import {catchError, map, take} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard {
    constructor(private router: Router,
                private authService: AuthService) {
    }

    canActivate() {
        return this.authService.user$.pipe(take(1), map(user => {
                if (user) {
                    return true;
                } else {
                    this.router.navigate(['']);
                    return false;
                }
            }),
            catchError(() => {
                this.router.navigate(['']);
                return of(false);
            }));
    }
}
