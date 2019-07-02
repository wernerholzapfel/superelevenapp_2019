import {TestBed} from '@angular/core/testing';
import {Formation} from '../models/formation.model';
import {FormationService} from './formation.service';


describe('Formation.Service.TsService', () => {
    beforeEach(() => TestBed.configureTestingModule({}));

    it('should be created', () => {
        const service: FormationService = TestBed.get(FormationService);
        expect(service).toBeTruthy();
    });
});
