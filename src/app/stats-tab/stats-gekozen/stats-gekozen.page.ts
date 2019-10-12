import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {UiService} from '../../ui.service';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {LoaderService} from '../../services/loader.service';

@Component({
    selector: 'app-stats',
    templateUrl: './stats-gekozen.page.html',
    styleUrls: ['./stats-gekozen.page.scss'],
})
export class StatsGekozenPage implements OnInit, OnDestroy {
    players: any[];
    unsubscribe = new Subject<void>();
    isLoading: Subject<boolean> = this.loaderService.isLoading;

    constructor(private uiService: UiService, private loaderService: LoaderService) {
    }

    ngOnInit() {
        this.uiService.stats$.pipe(takeUntil(this.unsubscribe)).subscribe(player => {
           this.players = player.map(p => {
                return {
                    ...p,
                    gekozen: p.teamPredictions ? p.teamPredictions.length : 0,
                    teamPredictions: p.teamPredictions ? p.teamPredictions.sort((a, b) => {
                        const x = a.participant.displayName.toLowerCase();
                        const y = b.participant.displayName.toLowerCase();
                        return x < y ? -1 : x > y ? 1 : 0;
                    }) : []
                };
            }).sort((a, b) => {
                const x = b.gekozen;
                const y = a.gekozen;
                return x < y ? -1 : x > y ? 1 : 0;
            });
        });
    }

    ngOnDestroy(): void {
        this.unsubscribe.next();
        this.unsubscribe.unsubscribe();
    }
}
