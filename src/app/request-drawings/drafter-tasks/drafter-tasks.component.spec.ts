import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrafterTasksComponent } from './drafter-tasks.component';

describe('DrafterTasksComponent', () => {
  let component: DrafterTasksComponent;
  let fixture: ComponentFixture<DrafterTasksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrafterTasksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrafterTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
