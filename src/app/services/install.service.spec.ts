import { TestBed } from '@angular/core/testing';

import { InstallService } from './install.service';

describe('InstallService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InstallService = TestBed.get(InstallService);
    expect(service).toBeTruthy();
  });
});
