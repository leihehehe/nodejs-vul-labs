import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Lab6Component } from './lab6.component';

describe('Lab6Component', () => {
  let component: Lab6Component;
  let fixture: ComponentFixture<Lab6Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Lab6Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Lab6Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
