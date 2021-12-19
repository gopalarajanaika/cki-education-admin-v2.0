import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NetFailureComponent } from './net-failure.component';

describe('NetFailureComponent', () => {
  let component: NetFailureComponent;
  let fixture: ComponentFixture<NetFailureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NetFailureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NetFailureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
