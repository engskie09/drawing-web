import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrafterComponent } from './drafter.component';

describe('DrafterComponent', () => {
  let component: DrafterComponent;
  let fixture: ComponentFixture<DrafterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrafterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrafterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
