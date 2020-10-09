import {Component, OnDestroy, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {BehaviorSubject, combineLatest, from, Subject} from 'rxjs';
import {ToastService} from '../../services/toast.service';
import {PlayerService} from '../../services/player.service';
import {FormationService} from '../../services/formation.service';
import {getCompetition} from '../../store/competition/competition.reducer';
import {mergeMap, take, takeUntil} from 'rxjs/operators';
import {Competition, PredictionType} from '../../models/competition.model';
import {IAppState} from '../../store/store';
import {Store} from '@ngrx/store';
import {Teamplayer} from '../../models/teamplayer.model';
import {TeamService} from '../../services/team.service';
import {Team} from '../../models/team.model';
import {PredictionService} from '../../services/prediction.service';
import {ScoreformUiService} from '../../services/scoreform-ui.service';

@Component({
    selector: 'app-players',
    templateUrl: './players.page.html',
    styleUrls: ['./players.page.scss'],
})


export class PlayersPage implements OnInit, OnDestroy {

    competition: any;
    prediction: any;
    players: Teamplayer[];
    teams: Team[];
    allPlayers: Teamplayer[];
    searchTerm$: BehaviorSubject<string> = new BehaviorSubject('');
    teamFilter$: BehaviorSubject<string> = new BehaviorSubject('');
    unsubscribe = new Subject<void>();
    customPopoverOptions: any = {
        header: 'Positie',
    };
    teamPopoverOptions: any = {
        header: 'Filter op club',
    };

    constructor(private store: Store<IAppState>,
                private modalController: ModalController,
                private toastService: ToastService,
                private formationService: FormationService,
                private teamService: TeamService,
                private predictionService: PredictionService,
                private scoreformUiService: ScoreformUiService,
                private playerService: PlayerService) {
    }

    ngOnInit() {

        this.store.select(getCompetition)
            .pipe(takeUntil(this.unsubscribe),
                mergeMap((competition: Competition) => {
                    if (competition && competition.predictions && competition.predictions.length > 0) {
                        this.competition = competition;
                        this.prediction = competition.predictions.find(p => p.predictionType === PredictionType.Team);
                        return combineLatest([
                            this.teamService.getTeams().pipe(take(1)),
                            this.playerService.getPlayersByPredictionId(this.prediction.id).pipe(take(1))])
                    } else {
                        return from([]);
                    }
                }))
            .pipe(takeUntil(this.unsubscribe))
            .subscribe(
                ([teams, players]) => {
                    if (players && teams) {
                        this.allPlayers = players;
                        this.players = players;
                        this.teams = teams;
                    }
                });

        combineLatest([this.searchTerm$, this.teamFilter$])
            .pipe(takeUntil(this.unsubscribe))
            .subscribe(([searchTerm, teamFilter]) => {
                if (this.allPlayers)
                this.players = this.scoreformUiService.filterPlayers(searchTerm, teamFilter, this.allPlayers);
            });
    }

    ngOnDestroy(): void {
        this.unsubscribe.next();
        this.unsubscribe.unsubscribe();
    }

    savePositie(event, player) {
        this.playerService.updatePlayer({...player, position: event.detail.value})
            .subscribe(updatedPlayer => {
                this.allPlayers = this.players.map(p => {
                    return p.id === player.id ? {...player, position: event.detail.value} : p
                });
                this.searchTerm$.next(this.searchTerm$.value);
            });
    }

    setPlayerInActive(player) {
        this.playerService.updatePlayer({...player, active: false}).subscribe(updatedPlayer => {
            this.allPlayers = this.players.filter(p => p.id !== player.id);
            this.searchTerm$.next(this.searchTerm$.value);
        });
    }

    search($event) {
        this.searchTerm$.next($event.detail.value);
    }

    filterPlayers(event) {
        this.teamFilter$.next(event.detail.value);
    }
}
