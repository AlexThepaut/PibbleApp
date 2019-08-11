import { TestBed } from '@angular/core/testing';

import { RacketService } from './racket.service';

describe('RacketService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RacketService = TestBed.get(RacketService);
    expect(service).toBeTruthy();
  });
});
