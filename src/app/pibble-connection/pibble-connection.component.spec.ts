import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PibbleConnectionComponent } from './pibble-connection.component';

describe('PibbleConnectionComponent', () => {
  let component: PibbleConnectionComponent;
  let fixture: ComponentFixture<PibbleConnectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PibbleConnectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PibbleConnectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
