import { TestBed } from '@angular/core/testing';

import { HandleImagesService } from './handle-images.service';

describe('HandleImagesService', () => {
  let service: HandleImagesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HandleImagesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
