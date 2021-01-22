import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestDrawingComponent } from './request-drawing.component';

describe('RequestDrawingComponent', () => {
  let component: RequestDrawingComponent;
  let fixture: ComponentFixture<RequestDrawingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestDrawingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestDrawingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
