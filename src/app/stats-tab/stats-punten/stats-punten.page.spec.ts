import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatsPuntenPage } from './stats-punten.page';

describe('StatsPuntenPage', () => {
  let component: StatsPuntenPage;
  let fixture: ComponentFixture<StatsPuntenPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatsPuntenPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatsPuntenPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
