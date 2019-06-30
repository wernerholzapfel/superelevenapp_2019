import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPlayerPage } from './add-player-page.component';

describe('AddplayerPage', () => {
  let component: AddPlayerPage;
  let fixture: ComponentFixture<AddPlayerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPlayerPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPlayerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
