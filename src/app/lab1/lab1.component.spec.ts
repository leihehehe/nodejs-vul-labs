import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Lab1Component } from './lab1.component';

describe('Lab1Component', () => {
  let component: Lab1Component;
  let fixture: ComponentFixture<Lab1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Lab1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Lab1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
