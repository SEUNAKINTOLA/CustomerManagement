import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Customers } from './customers.component';

describe('Customers', () => {
  let component: Customers;
  let fixture: ComponentFixture<Customers>;

  beforeEach(async(() => {
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
