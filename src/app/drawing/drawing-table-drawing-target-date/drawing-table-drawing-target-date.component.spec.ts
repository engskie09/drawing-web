import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrawingTableDrawingTargetDateComponent } from './drawing-table-drawing-target-date.component';

describe('DrawingTableDrawingTargetDateComponent', () => {
  let component: DrawingTableDrawingTargetDateComponent;
  let fixture: ComponentFixture<DrawingTableDrawingTargetDateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrawingTableDrawingTargetDateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrawingTableDrawingTargetDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
