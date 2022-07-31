import {Component, EventEmitter, Input, NgZone, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
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
    @Output() roundChange = new EventEmitter();

    @Input()
    public set rounds(rounds: Round[]) {
        if (rounds && rounds.length > 0) {
            this._rounds = rounds;
        }
    };

    public get rounds(): Round[] {
        return this._rounds;
    }

    public activeRound: string;

    unsubscribe = new Subject<void>();

    customPopoverOptions: any = {
        header: 'Kies speelronde',
    };
    private _rounds: Round[];

    constructor(private roundService: RoundService,
                private scoreformUiService: ScoreformUiService) {
    }

    ngOnInit() {
        this.roundService.previousRoundId$
            .pipe(first(value => value !== ''), takeUntil(this.unsubscribe))
            .subscribe(activeRound => {
                    console.log(activeRound)
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
