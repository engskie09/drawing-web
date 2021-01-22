import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TenderDrawingComponent } from './tender-drawing.component';

describe('TenderDrawingComponent', () => {
  let component: TenderDrawingComponent;
  let fixture: ComponentFixture<TenderDrawingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TenderDrawingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TenderDrawingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
