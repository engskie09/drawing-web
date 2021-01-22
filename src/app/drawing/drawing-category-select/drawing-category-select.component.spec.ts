import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrawingCategorySelectComponent } from './drawing-category-select.component';

describe('DrawingCategorySelectComponent', () => {
  let component: DrawingCategorySelectComponent;
  let fixture: ComponentFixture<DrawingCategorySelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrawingCategorySelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrawingCategorySelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
