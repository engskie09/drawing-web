import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrawingSummaryComponent } from './drawing-summary.component';

describe('DrawingSummaryComponent', () => {
  let component: DrawingSummaryComponent;
  let fixture: ComponentFixture<DrawingSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrawingSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrawingSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
