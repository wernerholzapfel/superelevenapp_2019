import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchesCardComponent } from './matches-card.component';

describe('MatchesCardComponent', () => {
  let component: MatchesCardComponent;
  let fixture: ComponentFixture<MatchesCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatchesCardComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchesCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
