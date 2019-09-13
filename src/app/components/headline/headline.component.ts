import {Component, OnDestroy, OnInit} from '@angular/core';
import {IHeadline} from '../../models/headline.model';
import {IAppState} from '../../store/store';
import {HeadlineService} from '../../services/headline.service';
import {getCompetition} from '../../store/competition/competition.reducer';
import {mergeMap, takeUntil} from 'rxjs/operators';
import {of, Subject} from 'rxjs';
import {Store} from '@ngrx/store';
import * as moment from 'moment';

@Component({
    selector: 'app-headline',
    templateUrl: './headline.component.html',
    styleUrls: ['./headline.component.scss'],
})
export class HeadlineComponent implements OnInit, OnDestroy {

    lastUpdated: string;
    headline: IHeadline;
    headlineIndex = 0;
    headlines: IHeadline[];
    unsubscribe = new Subject<void>();

    constructor(private store: Store<IAppState>, private headlineService: HeadlineService) {
    }

    ngOnInit() {
        this.store.select(getCompetition).pipe(takeUntil(this.unsubscribe), mergeMap(competition => {
            if (competition && competition.predictions) {
                return this.headlineService.getHeadlines(competition.id);
            } else {
                return of([]);
            }
        }))
            .pipe(takeUntil(this.unsubscribe))
            .subscribe(headlines => {
                if (headlines && headlines.length > 0) {
                    this.headlines = headlines;
                    this.headline = headlines[this.headlineIndex];
                    this.lastUpdated = moment(this.headline.createdDate).fromNow();
                }
            });
    }

    nextHeadline() {
        this.headlineIndex++;
        this.headline = this.headlines[this.headlineIndex];
        this.lastUpdated = moment(this.headline.createdDate).fromNow();

    }

    previousHeadline() {
        this.headlineIndex--;
        this.headline = this.headlines[this.headlineIndex];
        this.lastUpdated = moment(this.headline.createdDate).fromNow();

    }

    addHeadline() {

    }

    editHeadline() {

    }

    ngOnDestroy(): void {
        this.unsubscribe.next();
        this.unsubscribe.unsubscribe();
    }
}
