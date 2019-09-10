import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Routes} from '@angular/router';

import {IonicModule} from '@ionic/angular';
import {PlayerStandItemComponent} from './player-stand-item.component';
import {HeaderModule} from '../header/header.module';
import {PlayerDetailScoreComponent} from '../player-detail-score/player-detail-score.component';


@NgModule({
    declarations: [PlayerStandItemComponent, PlayerDetailScoreComponent],
    imports: [
        CommonModule,
        IonicModule,
        FormsModule,
        HeaderModule,
    ],
    exports: [PlayerStandItemComponent, PlayerDetailScoreComponent]
})
export class PlayerStandItemModule {
}
