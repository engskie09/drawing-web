import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TenderDrawingHistoryComponent } from './tender-drawing-history.component';

describe('TenderDrawingHistoryComponent', () => {
  let component: TenderDrawingHistoryComponent;
  let fixture: ComponentFixture<TenderDrawingHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TenderDrawingHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TenderDrawingHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
