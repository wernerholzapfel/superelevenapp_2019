import {Component, OnInit} from '@angular/core';
import {MenuService} from '../../services/menu.service';
import {AuthService} from '../../services/auth.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

    appPages: any[];

    constructor(private menuService: MenuService, private authService: AuthService) {
    }

    ngOnInit() {
        this.appPages = this.menuService.appPages;
    }

    showMenuItem(p) {
        return p.onlyForAdmin ? this.authService.isAdmin :
            p.onlyForUser ? this.authService.isLoggedIn() : true;
    }
}
