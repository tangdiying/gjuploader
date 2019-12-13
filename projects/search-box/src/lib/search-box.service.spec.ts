import { TestBed } from '@angular/core/testing';

import { SearchBoxService } from './search-box.service';

describe('SearchBoxService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SearchBoxService = TestBed.get(SearchBoxService);
    expect(service).toBeTruthy();
  });
});
