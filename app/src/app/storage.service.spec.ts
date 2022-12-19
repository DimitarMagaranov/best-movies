import { TestBed } from '@angular/core/testing';

import { storageService } from './storage.service';

describe('StorageService', () => {
  let service: storageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(storageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
