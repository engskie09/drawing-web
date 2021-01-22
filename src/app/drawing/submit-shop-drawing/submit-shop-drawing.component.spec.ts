import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitShopDrawingComponent } from './submit-shop-drawing.component';

describe('SubmitShopDrawingComponent', () => {
  let component: SubmitShopDrawingComponent;
  let fixture: ComponentFixture<SubmitShopDrawingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubmitShopDrawingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmitShopDrawingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
