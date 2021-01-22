import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestDrawingsComponent } from './request-drawings.component';

describe('RequestDrawingsComponent', () => {
  let component: RequestDrawingsComponent;
  let fixture: ComponentFixture<RequestDrawingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestDrawingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestDrawingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
