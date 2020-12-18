import { TestBed } from '@angular/core/testing';

import { AESEncryptDecryptServiceService } from './aesencrypt-decrypt-service.service';

describe('AESEncryptDecryptServiceService', () => {
  let service: AESEncryptDecryptServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AESEncryptDecryptServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
