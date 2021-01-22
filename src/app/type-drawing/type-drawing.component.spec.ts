import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeDrawingComponent } from './type-drawing.component';

describe('TypeDrawingComponent', () => {
  let component: TypeDrawingComponent;
  let fixture: ComponentFixture<TypeDrawingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypeDrawingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeDrawingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
