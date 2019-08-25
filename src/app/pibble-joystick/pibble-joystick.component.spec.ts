import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PibbleJoystickComponent } from './pibble-joystick.component';

describe('PibbleJoystickComponent', () => {
  let component: PibbleJoystickComponent;
  let fixture: ComponentFixture<PibbleJoystickComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PibbleJoystickComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PibbleJoystickComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
