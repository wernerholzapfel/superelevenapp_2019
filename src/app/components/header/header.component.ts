import {Component, Input, OnInit} from '@angular/core';
import {MenuService} from '../../services/menu.service';
import {AuthService} from '../../services/auth.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

    appPages: any[];
    @Input() showMenu = true;

    constructor(private menuService: MenuService, private authService: AuthService) {
    }

    ngOnInit() {
        this.appPages = this.menuService.appPages;
    }

    showMenuItem(item) {
        return this.menuService.showMenuItem(item);
    }
}
