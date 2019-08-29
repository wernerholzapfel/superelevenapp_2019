import {Component, Input, OnInit} from '@angular/core';
import {Match} from '../../models/match.model';
import {ToastService} from '../../services/toast.service';
import {ResultScoreService} from '../../services/result-score.service';

@Component({
    selector: 'app-matches-card',
    templateUrl: './matches-card.component.html',
    styleUrls: ['./matches-card.component.scss'],
})
export class MatchesCardComponent implements OnInit {

    @Input() match: Match;
    round: { id: string };

    constructor(private toastService: ToastService,
                private resultScoreService: ResultScoreService) {
    }

    ngOnInit() {
    }

    save(match) {
        this.resultScoreService.postMatchResult(
            {...match, round: this.round})
            .subscribe(response => {
                this.toastService.presentToast('opslaan is gelukt', 'primary');
            }, error1 => {
                this.toastService.presentToast('Opslaan is mislukt', 'warning');
            });
    }

    canISaveForm(match: Match): boolean {
        return !!(match.homeScore > -1 && match.awayScore > -1);
    }

    setRound(roundId) {
        this.round = {id: roundId};
    }
}
