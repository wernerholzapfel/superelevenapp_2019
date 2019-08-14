import {Component} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {Observable} from 'rxjs';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage {

    constructor(public authService: AuthService) {
    }

}
