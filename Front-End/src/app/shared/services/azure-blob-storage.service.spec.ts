import { TestBed } from '@angular/core/testing';

import { AzureBlobStorageService } from './azure-blob-storage.service';

xdescribe('AzureBlobStorageService', () => {
  let service: AzureBlobStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AzureBlobStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
