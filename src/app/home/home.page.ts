import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {of, Subject} from 'rxjs';
import {mergeMap, takeUntil} from 'rxjs/operators';
import {UiService} from '../ui.service';
import {ParticipantService} from '../services/participant.service';
import {IParticipant} from '../models/participant.model';
import * as moment from 'moment';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {

    constructor(public authService: AuthService,
                private participantService: ParticipantService,
                private uiService: UiService) {
        moment.locale('nl');
    }

    nummereen: any;
    unsubscribe = new Subject<void>();
    participant: IParticipant;
    participantStand: any;
    lastUpdated: string;

    ngOnInit(): void {

        this.uiService.lastUpdated$.pipe(takeUntil(this.unsubscribe)).subscribe(lastupdated => {
            if (lastupdated) {
                this.lastUpdated = moment(lastupdated.lastUpdated).fromNow();
            }
        });

        this.authService.user$.pipe(takeUntil(this.unsubscribe)).pipe(mergeMap(user => {
            if (user) {
                return this.participantService.getLoggedInParticipant().pipe(mergeMap(participant => {
                    if (participant) {
                        this.participant = participant;
                        return this.uiService.totaalstand$.pipe(takeUntil(this.unsubscribe));
                    } else {
                        return of(null);
                    }
                }));
            } else {
                return of(null);
            }
        })).subscribe(totaalstand => {
            if (totaalstand && totaalstand.length > 0) {
                this.nummereen = totaalstand[0];
                this.participantStand = totaalstand.find(item => item.id === this.participant.id);
            } else {
                this.nummereen = null;
                this.participantStand = null;
            }
        });
    }

    ngOnDestroy(): void {
        this.unsubscribe.next();
        this.unsubscribe.unsubscribe();
    }
}
