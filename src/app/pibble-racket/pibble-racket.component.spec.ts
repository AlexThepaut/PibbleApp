import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PibbleRacketComponent } from './pibble-racket.component';

describe('PibbleRacketComponent', () => {
  let component: PibbleRacketComponent;
  let fixture: ComponentFixture<PibbleRacketComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PibbleRacketComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PibbleRacketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
