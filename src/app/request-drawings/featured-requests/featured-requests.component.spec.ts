import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturedRequestsComponent } from './featured-requests.component';

describe('FeaturedRequestsComponent', () => {
  let component: FeaturedRequestsComponent;
  let fixture: ComponentFixture<FeaturedRequestsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeaturedRequestsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeaturedRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
