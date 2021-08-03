import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { Customers } from './customers.component';

describe('Customers', () => {
  let component: Customers;
  let fixture: ComponentFixture<Customers>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ Customers ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Customers);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
