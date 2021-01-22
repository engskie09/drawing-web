import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VersionedFieldComponent } from './versioned-field.component';

describe('VersionedFieldComponent', () => {
  let component: VersionedFieldComponent;
  let fixture: ComponentFixture<VersionedFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VersionedFieldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VersionedFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
