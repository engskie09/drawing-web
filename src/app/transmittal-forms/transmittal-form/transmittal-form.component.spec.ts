import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransmittalFormComponent } from './transmittal-form.component';

describe('TransmittalFormComponent', () => {
  let component: TransmittalFormComponent;
  let fixture: ComponentFixture<TransmittalFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransmittalFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransmittalFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
