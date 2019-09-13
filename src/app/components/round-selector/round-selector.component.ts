import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Subject} from 'rxjs';
import {ScoreformUiService} from '../../services/scoreform-ui.service';
import {RoundService} from '../../services/round.service';
import {Round} from '../../models/prediction.model';
import {first, takeUntil} from 'rxjs/operators';

@Component({
    selector: 'app-round-selector',
    templateUrl: './round-selector.component.html',
    styleUrls: ['./round-selector.component.scss'],
})
export class RoundSelectorComponent implements OnInit, OnDestroy {

    @Input() showTotaal: boolean;
    @Input() color: string;
    @Input() activeRound: string;
    @Output() roundChange = new EventEmitter();
    allRounds: Round[];
    unsubscribe = new Subject<void>();

    customPopoverOptions: any = {
        header: 'speelronde',
    };

    constructor(private roundService: RoundService,
                private scoreformUiService: ScoreformUiService) {
    }

    ngOnInit() {
        this.roundService.allRounds$
            .pipe(takeUntil(this.unsubscribe))
            .subscribe(rounds => this.allRounds = rounds);

        this.roundService.previousRoundId$
            .pipe(first(value => value !== ''), takeUntil(this.unsubscribe))
            .subscribe(activeRound => {
                    this.activeRound = this.activeRound ? this.activeRound : activeRound;
                    this.roundChange.emit(this.activeRound);
                }
            );
    }

    filterRounds($event) {
        this.activeRound = $event.detail.value;
        this.roundChange.emit($event.detail.value);
    }

    ngOnDestroy(): void {
        this.unsubscribe.next();
        this.unsubscribe.unsubscribe();
    }

}
