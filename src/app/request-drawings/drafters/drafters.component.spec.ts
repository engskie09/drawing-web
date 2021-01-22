import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DraftersComponent } from './drafters.component';

describe('DraftersComponent', () => {
  let component: DraftersComponent;
  let fixture: ComponentFixture<DraftersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DraftersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DraftersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
