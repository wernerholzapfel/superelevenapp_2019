import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EditHeadlineComponent} from './edit-headline.component';
import {IonicModule} from '@ionic/angular';
import {HeaderModule} from '../header/header.module';
import {FormsModule} from '@angular/forms';


@NgModule({
    declarations: [EditHeadlineComponent],
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        HeaderModule
    ],
    exports: [
        EditHeadlineComponent
    ]
})
export class EditHeadlineModule {
}
