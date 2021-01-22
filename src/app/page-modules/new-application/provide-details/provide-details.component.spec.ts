import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProvideDetailsComponent } from './provide-details.component';

describe('ProvideDetailsComponent', () => {
  let component: ProvideDetailsComponent;
  let fixture: ComponentFixture<ProvideDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProvideDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProvideDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
