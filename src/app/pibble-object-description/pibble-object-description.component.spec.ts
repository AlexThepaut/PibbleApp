import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PibbleObjectDescriptionComponent } from './pibble-object-description.component';

describe('PibbleObjectDescriptionComponent', () => {
  let component: PibbleObjectDescriptionComponent;
  let fixture: ComponentFixture<PibbleObjectDescriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PibbleObjectDescriptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PibbleObjectDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
