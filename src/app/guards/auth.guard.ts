import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable, of} from 'rxjs';
import {AuthService} from '../services/auth.service';
import {catchError, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard  {
  constructor(private router: Router,
              private authService: AuthService) {
  }

  canActivate() {
    return this.authService.isLoggedIn().pipe(map(user => {
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
