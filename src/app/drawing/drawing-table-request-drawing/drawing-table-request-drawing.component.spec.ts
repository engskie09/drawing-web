import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrawingTableRequestDrawingComponent } from './drawing-table-request-drawing.component';

describe('DrawingTableRequestDrawingComponent', () => {
  let component: DrawingTableRequestDrawingComponent;
  let fixture: ComponentFixture<DrawingTableRequestDrawingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrawingTableRequestDrawingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrawingTableRequestDrawingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
