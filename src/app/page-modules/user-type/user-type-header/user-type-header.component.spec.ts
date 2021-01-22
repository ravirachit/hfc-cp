import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserTypeHeaderComponent } from './user-type-header.component';

describe('UserTypeHeaderComponent', () => {
  let component: UserTypeHeaderComponent;
  let fixture: ComponentFixture<UserTypeHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserTypeHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserTypeHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
