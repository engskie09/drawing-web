import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTransmittalFormComponent } from './create-transmittal-form.component';

describe('CreateTransmittalFormComponent', () => {
  let component: CreateTransmittalFormComponent;
  let fixture: ComponentFixture<CreateTransmittalFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateTransmittalFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateTransmittalFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
