import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestTableFiltersComponent } from './request-table-filters.component';

describe('RequestTableFiltersComponent', () => {
  let component: RequestTableFiltersComponent;
  let fixture: ComponentFixture<RequestTableFiltersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestTableFiltersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestTableFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
