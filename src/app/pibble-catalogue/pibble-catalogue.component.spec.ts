import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PibbleCatalogueComponent } from './pibble-catalogue.component';

describe('PibbleCatalogueComponent', () => {
  let component: PibbleCatalogueComponent;
  let fixture: ComponentFixture<PibbleCatalogueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PibbleCatalogueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PibbleCatalogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
