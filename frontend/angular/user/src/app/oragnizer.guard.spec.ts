import { TestBed } from '@angular/core/testing';

import { OragnizerGuard } from './oragnizer.guard';

describe('OragnizerGuard', () => {
  let guard: OragnizerGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(OragnizerGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
