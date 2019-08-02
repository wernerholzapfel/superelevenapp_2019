import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {PredictionsTabPage} from '../predictions_tab/predictions_tab.page';


describe('Predictions_tabPage', () => {
  let component: PredictionsTabPage;
  let fixture: ComponentFixture<PredictionsTabPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PredictionsTabPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PredictionsTabPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
