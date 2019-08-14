import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import {LoginModule} from '../components/login/login.module';
import {HeaderModule} from '../components/header/header.module';
import {ProfileComponent} from './profile.component';


const routes: Routes = [
    {
        path: 'profile',
        component: ProfileComponent,
    },
    {
        path: '',
        redirectTo: 'profile',
        pathMatch: 'full'
    }
];

@NgModule({
    declarations: [ProfileComponent],
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        LoginModule,
        HeaderModule,
        RouterModule.forChild(routes)
    ]
})
export class ProfileModule {
}
