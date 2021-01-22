import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrawingSelectComponent } from './drawing-select.component';

describe('DrawingSelectComponent', () => {
  let component: DrawingSelectComponent;
  let fixture: ComponentFixture<DrawingSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrawingSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrawingSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
