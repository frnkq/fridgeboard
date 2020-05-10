import { TestBed } from '@angular/core/testing';

import { MagnetsService } from './magnets.service';

describe('MagnetsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MagnetsService = TestBed.get(MagnetsService);
    expect(service).toBeTruthy();
  });
});
