import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrawingCategoriesTableComponent } from './drawing-categories-table.component';

describe('DrawingCategoriesTableComponent', () => {
  let component: DrawingCategoriesTableComponent;
  let fixture: ComponentFixture<DrawingCategoriesTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrawingCategoriesTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrawingCategoriesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
