import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PibbleMenuComponent } from './pibble-menu.component';

describe('PibbleMenuComponent', () => {
  let component: PibbleMenuComponent;
  let fixture: ComponentFixture<PibbleMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PibbleMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PibbleMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
