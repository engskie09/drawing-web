import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AsBuiltDrawingComponent } from './as-built-drawing.component';

describe('AsBuiltDrawingComponent', () => {
  let component: AsBuiltDrawingComponent;
  let fixture: ComponentFixture<AsBuiltDrawingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AsBuiltDrawingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsBuiltDrawingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
