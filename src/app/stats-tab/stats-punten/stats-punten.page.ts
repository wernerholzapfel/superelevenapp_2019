import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {UiService} from '../../ui.service';
import {takeUntil} from 'rxjs/operators';
import {LoaderService} from '../../services/loader.service';

@Component({
    selector: 'app-stats-punten',
    templateUrl: './stats-punten.page.html',
    styleUrls: ['./stats-punten.page.scss'],
})
export class StatsPuntenPage implements OnInit, OnDestroy {
    players: any[];
    unsubscribe = new Subject<void>();
    isLoading: Subject<boolean> = this.loaderService.isLoading;

    constructor(private uiService: UiService, private loaderService: LoaderService) {
    }

    ngOnInit() {
        this.uiService.stats$.pipe(takeUntil(this.unsubscribe)).subscribe(players => {
            this.players = players;
        });
    }

    ngOnDestroy(): void {
        this.unsubscribe.next();
        this.unsubscribe.unsubscribe();
    }
}
