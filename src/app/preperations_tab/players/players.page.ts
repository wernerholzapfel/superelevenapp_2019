import {Component, OnDestroy, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {combineLatest, from, Subject} from 'rxjs';
import {Formation, FormationPlayer} from '../../models/formation.model';
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

import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

@Component({
    selector: 'app-players',
    templateUrl: './players.page.html',
    styleUrls: ['./players.page.scss'],
})


export class PlayersPage implements OnInit, OnDestroy {

    competition: any;
    prediction: any;
    players: Teamplayer[];
    unsubscribe = new Subject<void>();
    customPopoverOptions: any = {
        header: 'Positie',
    };

    constructor(private store: Store<IAppState>,
                private modalController: ModalController,
                private toastService: ToastService,
                private formationService: FormationService,
                private teamService: TeamService,
                private predictionService: PredictionService,
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
                            this.playerService.getPlayersByPredictionId(this.prediction.id).pipe(take(1))])
                    } else {
                        return from([]);
                    }
                }))
            .pipe(takeUntil(this.unsubscribe))
            .subscribe(
                ([players]) => {
                    if (players) {
                        this.players = players;
                    }
                });
    }

    ngOnDestroy(): void {
        this.unsubscribe.next();
        this.unsubscribe.unsubscribe();
    }

    savePositie(event, player) {
        this.playerService.updatePlayer({...player, position: event.detail.value})
            .subscribe(updatedPlayer => {
                this.players = this.players.map(p => {
                    return p.id === player.id ? {...player, position: event.detail.value} : p
                });
            });
    }

    setPlayerInActive(player) {
        this.playerService.updatePlayer({...player, active: false}).subscribe(updatedPlayer => {
            this.players = this.players.filter(p => p.id !== player.id);
        });
    }
}
