import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AjaxAutocompleteComponent } from './ajax-autocomplete.component';

describe('AjaxAutocompleteComponent', () => {
  let component: AjaxAutocompleteComponent;
  let fixture: ComponentFixture<AjaxAutocompleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AjaxAutocompleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AjaxAutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
