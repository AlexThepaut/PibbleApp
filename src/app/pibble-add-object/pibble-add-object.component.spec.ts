import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PibbleAddObjectComponent } from './pibble-add-object.component';

describe('PibbleAddObjectComponent', () => {
  let component: PibbleAddObjectComponent;
  let fixture: ComponentFixture<PibbleAddObjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PibbleAddObjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PibbleAddObjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
