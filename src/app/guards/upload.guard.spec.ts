import { TestBed, async, inject } from '@angular/core/testing';

import { UploadGuard } from './upload.guard';

describe('UploadGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UploadGuard]
    });
  });

  it('should ...', inject([UploadGuard], (guard: UploadGuard) => {
    expect(guard).toBeTruthy();
  }));
});
