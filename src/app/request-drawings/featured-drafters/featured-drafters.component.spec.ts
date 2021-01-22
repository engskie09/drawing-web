import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturedDraftersComponent } from './featured-drafters.component';

describe('FeaturedDraftersComponent', () => {
  let component: FeaturedDraftersComponent;
  let fixture: ComponentFixture<FeaturedDraftersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeaturedDraftersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeaturedDraftersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
