import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransmittalFormsComponent } from './transmittal-forms.component';

describe('TransmittalFormsComponent', () => {
  let component: TransmittalFormsComponent;
  let fixture: ComponentFixture<TransmittalFormsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransmittalFormsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransmittalFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
