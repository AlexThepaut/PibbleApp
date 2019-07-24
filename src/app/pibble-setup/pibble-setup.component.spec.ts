import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PibbleSetupComponent } from './pibble-setup.component';

describe('PibbleSetupComponent', () => {
  let component: PibbleSetupComponent;
  let fixture: ComponentFixture<PibbleSetupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PibbleSetupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PibbleSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
