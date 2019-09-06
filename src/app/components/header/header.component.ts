import {Component, Input, NgZone, OnDestroy, OnInit} from '@angular/core';
import {MenuService} from '../../services/menu.service';
import {AuthService} from '../../services/auth.service';
import {Observable, Subject} from 'rxjs';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {

    @Input() showMenu = true;
    unsubscribe = new Subject<void>();

    constructor(public menuService: MenuService, private authService: AuthService) {
    }

    isLoggedIn$: Observable<firebase.User> = this.authService.user$;


    ngOnInit() {
    }

    logout() {
        this.authService.logout();
    }

    ngOnDestroy() {
        this.unsubscribe.next();
        this.unsubscribe.complete();
    }
}
