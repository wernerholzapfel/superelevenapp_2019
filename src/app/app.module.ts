import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';

import {IonicModule, IonicRouteStrategy} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {environment} from '../environments/environment';
import {AngularFireModule} from '@angular/fire';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {ParticipantService} from './services/participant.service';
import {AuthService} from './services/auth.service';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {TokenInterceptor} from './services/token.interceptor';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {PredictionsService} from './services/predictions.service';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {CompetitionService} from './services/competition.service';
import {effects, metaReducers, reducers} from './store/store';
import {AuthGuard} from './guards/auth.guard';
import {HeaderModule} from './components/header/header.module';
import {HttperrorInterceptor} from './interceptors/httperror.interceptor';

@NgModule({
    declarations: [
        AppComponent],
    entryComponents: [],
    imports: [
        HeaderModule,
        BrowserModule,
        IonicModule.forRoot(),
        AppRoutingModule,
        HttpClientModule,
        AngularFireModule.initializeApp(environment.firebase, 'angular-auth-firebase'),
        AngularFireAuthModule,
        StoreModule.forRoot(reducers, { metaReducers }),
        EffectsModule.forRoot(effects),
        StoreDevtoolsModule.instrument(),
    ],
    providers: [
        AuthService,
        AuthGuard,
        CompetitionService,
        StatusBar,
        SplashScreen,
        ParticipantService,
        PredictionsService,
        {provide: RouteReuseStrategy, useClass: IonicRouteStrategy},
        {
            provide: HTTP_INTERCEPTORS,
            useClass: TokenInterceptor,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: HttperrorInterceptor,
            multi: true,
        },
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
