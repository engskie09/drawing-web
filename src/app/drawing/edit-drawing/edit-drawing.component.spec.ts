import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDrawingComponent } from './edit-drawing.component';

describe('EditDrawingComponent', () => {
  let component: EditDrawingComponent;
  let fixture: ComponentFixture<EditDrawingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [  ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditDrawingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
