import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewApplicationDashboardComponent } from './new-application-dashboard.component';

describe('NewApplicationDashboardComponent', () => {
  let component: NewApplicationDashboardComponent;
  let fixture: ComponentFixture<NewApplicationDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewApplicationDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewApplicationDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
