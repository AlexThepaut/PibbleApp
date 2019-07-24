import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PibbleInfoComponent } from './pibble-info.component';

describe('PibbleInfoComponent', () => {
  let component: PibbleInfoComponent;
  let fixture: ComponentFixture<PibbleInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PibbleInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PibbleInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
