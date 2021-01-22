import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompleteDrawingRequestComponent } from './complete-drawing-request.component';

describe('CompleteDrawingRequestComponent', () => {
  let component: CompleteDrawingRequestComponent;
  let fixture: ComponentFixture<CompleteDrawingRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompleteDrawingRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompleteDrawingRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
