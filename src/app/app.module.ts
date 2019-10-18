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
import {PredictionService} from './services/prediction.service';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {CompetitionService} from './services/competition.service';
import {effects, metaReducers, reducers} from './store/store';
import {AuthGuard} from './guards/auth.guard';
import {HeaderModule} from './components/header/header.module';
import {HttpErrorInterceptor} from './interceptors/http-error-interceptor.service';
import {CanDeactivateGuard} from './guards/candeactivate.guard';
import {ToastService} from './services/toast.service';
import {LoaderInterceptor} from './interceptors/loader.interceptor';
import {LoaderService} from './services/loader.service';
import {LoaderModule} from './components/loader/loader.module';
import {MenuService} from './services/menu.service';
import {AddplayerPageModule} from './predictions_tab/team/addplayer/addplayer.module';
import {PlayerScoreformModule} from './results_tab/players/playerScoreform/player-scoreform.module';
import {OneSignal} from '@ionic-native/onesignal/ngx';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {RoundService} from './services/round.service';

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
        LoaderModule,
        AngularFireModule.initializeApp(environment.firebase, 'angular-auth-firebase'),
        AngularFireAuthModule,
        AngularFireDatabaseModule,
        StoreModule.forRoot(reducers, {metaReducers}),
        EffectsModule.forRoot(effects),
        StoreDevtoolsModule.instrument(),
        AddplayerPageModule,
        PlayerScoreformModule
    ],
    providers: [
        AuthService,
        AuthGuard,
        CanDeactivateGuard,
        CompetitionService,
        StatusBar,
        SplashScreen,
        LoaderService,
        MenuService,
        ParticipantService,
        PredictionService,
        RoundService,
        ToastService,
        {provide: RouteReuseStrategy, useClass: IonicRouteStrategy},
        {
            provide: HTTP_INTERCEPTORS,
            useClass: TokenInterceptor,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: HttpErrorInterceptor,
            multi: true,
        }, {
            provide: HTTP_INTERCEPTORS,
            useClass: LoaderInterceptor,
            multi: true,
        },
        OneSignal
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
