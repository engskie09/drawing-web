import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestDrawingActionComponent } from './request-drawing-action.component';

describe('RequestDrawingActionComponent', () => {
  let component: RequestDrawingActionComponent;
  let fixture: ComponentFixture<RequestDrawingActionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestDrawingActionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestDrawingActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
