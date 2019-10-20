import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RankingStandPage } from './ranking-stand.page';

describe('RankingStandPage', () => {
  let component: RankingStandPage;
  let fixture: ComponentFixture<RankingStandPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RankingStandPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RankingStandPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
