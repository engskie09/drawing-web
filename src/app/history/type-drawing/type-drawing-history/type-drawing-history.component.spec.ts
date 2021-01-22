import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeDrawingHistoryComponent } from './type-drawing-history.component';

describe('TypeDrawingHistoryComponent', () => {
  let component: TypeDrawingHistoryComponent;
  let fixture: ComponentFixture<TypeDrawingHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypeDrawingHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeDrawingHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
