import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransmittalFormItemComponent } from './transmittal-form-item.component';

describe('TransmittalFormItemComponent', () => {
  let component: TransmittalFormItemComponent;
  let fixture: ComponentFixture<TransmittalFormItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransmittalFormItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransmittalFormItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
