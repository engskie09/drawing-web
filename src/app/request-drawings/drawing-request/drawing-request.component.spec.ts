import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrawingRequestComponent } from './drawing-request.component';

describe('DrawingRequestComponent', () => {
  let component: DrawingRequestComponent;
  let fixture: ComponentFixture<DrawingRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrawingRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrawingRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
