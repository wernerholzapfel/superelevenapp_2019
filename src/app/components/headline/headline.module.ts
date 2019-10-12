import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeadlineComponent} from './headline.component';
import {EditHeadlineComponent} from '../edit-headline/edit-headline.component';
import {FormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import {LoaderModule} from '../loader/loader.module';
import {EditHeadlineModule} from '../edit-headline/edit-headline.module';


@NgModule({
    declarations: [HeadlineComponent],
    imports: [CommonModule,
        FormsModule,
        IonicModule,
        LoaderModule,
        EditHeadlineModule],
    entryComponents: [EditHeadlineComponent],
    exports: [HeadlineComponent]
})
export class HeadlineModule {
}
