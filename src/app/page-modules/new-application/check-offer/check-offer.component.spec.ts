import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckOfferComponent } from './check-offer.component';

describe('CheckOfferComponent', () => {
  let component: CheckOfferComponent;
  let fixture: ComponentFixture<CheckOfferComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckOfferComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckOfferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
