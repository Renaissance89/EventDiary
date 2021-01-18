import { TestBed } from '@angular/core/testing';

import { OdashboardService } from './odashboard.service';

describe('OdashboardService', () => {
  let service: OdashboardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OdashboardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
