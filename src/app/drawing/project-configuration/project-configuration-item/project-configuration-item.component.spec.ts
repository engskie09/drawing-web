import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectConfigurationItemComponent } from './project-configuration-item.component';

describe('ProjectConfigurationItemComponent', () => {
  let component: ProjectConfigurationItemComponent;
  let fixture: ComponentFixture<ProjectConfigurationItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectConfigurationItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectConfigurationItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
