import { TestBed } from '@angular/core/testing';

import { S3BucketsService } from './s3-buckets.service';

describe('S3BucketsService', () => {
  let service: S3BucketsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(S3BucketsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
