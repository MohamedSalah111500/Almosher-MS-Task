import { TestBed } from '@angular/core/testing';

import { GetXhrService } from './get-xhr.service';

describe('GetXhrService', () => {
  let service: GetXhrService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetXhrService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
