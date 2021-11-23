import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Lab4Component } from './lab4.component';

describe('Lab4Component', () => {
  let component: Lab4Component;
  let fixture: ComponentFixture<Lab4Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Lab4Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Lab4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
