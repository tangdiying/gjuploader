import { TestBed } from '@angular/core/testing';

import { SearchDemoService } from './search-demo.service';

describe('SearchDemoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SearchDemoService = TestBed.get(SearchDemoService);
    expect(service).toBeTruthy();
  });
});
