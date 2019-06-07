import {Component, OnInit, ViewChild} from '@angular/core';
import {IonReorderGroup} from '@ionic/angular';

@Component({
    selector: 'app-list',
    templateUrl: 'list.page.html',
    styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit {
    @ViewChild(IonReorderGroup, {static: false}) reorderGroup: IonReorderGroup;

    private selectedItem: any;
    private icons = [
        'flask',
        'wifi',
        'beer',
        'football',
        'basketball',
        'paper-plane',
        'american-football',
        'boat',
        'bluetooth',
        'build'
    ];
    public items: Array<{ title: string; note: string; icon: string, positie: number }> = [];

    constructor() {
        // get teams for current competition
        for (let i = 1; i < 11; i++) {
            this.items.push({
                title: 'Item ' + i,
                note: 'This is item #' + i,
                icon: this.icons[Math.floor(Math.random() * this.icons.length)],
                positie: i
            });
        }
    }

    ngOnInit() {
    }

    doReorder(ev: any) {
        // Before complete is called with the items they will remain in the
        // order before the drag
        console.log('Before complete', this.items);
        console.log(ev.detail.from);
        // Finish the reorder and position the item in the DOM based on
        // where the gesture ended. Update the items variable to the
        // new order of items

        this.items = ev.detail.complete(this.items).map((item, index) => Object.assign(item, {positie: index + 1}));

        // After complete is called the items will be in the new order
        console.log('After complete', this.items);
    }
}
