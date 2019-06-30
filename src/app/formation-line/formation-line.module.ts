import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IonicModule} from '@ionic/angular';
import {FormationLineComponent} from './formation-line.component';
import {FormsModule} from '@angular/forms';

@NgModule({
    declarations: [FormationLineComponent],
    imports: [
        CommonModule,
        IonicModule,
        FormsModule,
    ],
    exports: [FormationLineComponent]
})
export class FormationLineModule {
}
