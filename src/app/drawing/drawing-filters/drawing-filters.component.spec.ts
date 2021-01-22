import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrawingFiltersComponent } from './drawing-filters.component';

describe('DrawingFiltersComponent', () => {
  let component: DrawingFiltersComponent;
  let fixture: ComponentFixture<DrawingFiltersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrawingFiltersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrawingFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
