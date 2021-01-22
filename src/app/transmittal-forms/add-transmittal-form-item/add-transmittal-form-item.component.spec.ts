import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTransmittalFormItemComponent } from './add-transmittal-form-item.component';

describe('AddTransmittalFormItemComponent', () => {
  let component: AddTransmittalFormItemComponent;
  let fixture: ComponentFixture<AddTransmittalFormItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddTransmittalFormItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTransmittalFormItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
