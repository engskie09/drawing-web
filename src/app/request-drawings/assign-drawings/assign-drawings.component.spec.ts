import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignDrawingsComponent } from './assign-drawings.component';

describe('AssignDrawingsComponent', () => {
  let component: AssignDrawingsComponent;
  let fixture: ComponentFixture<AssignDrawingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignDrawingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignDrawingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
