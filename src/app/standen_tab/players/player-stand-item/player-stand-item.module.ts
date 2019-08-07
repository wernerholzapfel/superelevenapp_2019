import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Routes} from '@angular/router';

import {IonicModule} from '@ionic/angular';
import {PlayerStandItemComponent} from './player-stand-item.component';


@NgModule({
    declarations: [PlayerStandItemComponent],
    imports: [
        CommonModule,
        IonicModule,
        FormsModule,
    ],
    exports: [PlayerStandItemComponent]
})
export class PlayerStandItemModule {
}
