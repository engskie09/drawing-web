import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LatestTransmittalFormComponent } from './latest-transmittal-form.component';

describe('LatestTransmittalFormComponent', () => {
  let component: LatestTransmittalFormComponent;
  let fixture: ComponentFixture<LatestTransmittalFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LatestTransmittalFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LatestTransmittalFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
