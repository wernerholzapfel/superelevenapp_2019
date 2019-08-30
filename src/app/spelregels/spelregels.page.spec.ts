import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpelregelsPage } from './spelregels.page';

describe('SpelregelsPage', () => {
  let component: SpelregelsPage;
  let fixture: ComponentFixture<SpelregelsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpelregelsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpelregelsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
