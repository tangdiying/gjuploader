import { TestBed } from '@angular/core/testing';

import { LalaService } from './lala.service';

describe('LalaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LalaService = TestBed.get(LalaService);
    expect(service).toBeTruthy();
  });
});
