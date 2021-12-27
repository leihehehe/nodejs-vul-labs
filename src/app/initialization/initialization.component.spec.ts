import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InitializationComponent } from './initialization.component';

describe('InitializationComponent', () => {
  let component: InitializationComponent;
  let fixture: ComponentFixture<InitializationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InitializationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InitializationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
