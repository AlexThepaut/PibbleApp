import { TestBed } from '@angular/core/testing';

import { GeolocalisationService } from './geolocalisation.service';

describe('GeolocalisationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GeolocalisationService = TestBed.get(GeolocalisationService);
    expect(service).toBeTruthy();
  });
});
