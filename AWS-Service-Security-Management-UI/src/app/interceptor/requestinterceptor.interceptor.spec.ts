import { TestBed } from '@angular/core/testing';

import { RequestinterceptorInterceptor } from './requestinterceptor.interceptor';

describe('RequestinterceptorInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      RequestinterceptorInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: RequestinterceptorInterceptor = TestBed.inject(RequestinterceptorInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
