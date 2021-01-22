import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectDrawingTypeItemComponent } from './project-drawing-type-item.component';

describe('ProjectDrawingTypeItemComponent', () => {
  let component: ProjectDrawingTypeItemComponent;
  let fixture: ComponentFixture<ProjectDrawingTypeItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectDrawingTypeItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectDrawingTypeItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
