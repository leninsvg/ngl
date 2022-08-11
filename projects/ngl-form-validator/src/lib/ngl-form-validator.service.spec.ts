import { TestBed } from '@angular/core/testing';

import { NglFormValidatorService } from './ngl-form-validator.service';

describe('NglFormValidatorService', () => {
  let service: NglFormValidatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NglFormValidatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
