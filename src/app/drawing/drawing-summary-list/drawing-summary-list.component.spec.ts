import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrawingSummaryListComponent } from './drawing-summary-list.component';

describe('DrawingSummaryListComponent', () => {
  let component: DrawingSummaryListComponent;
  let fixture: ComponentFixture<DrawingSummaryListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrawingSummaryListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrawingSummaryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
