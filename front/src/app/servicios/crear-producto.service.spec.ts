import { TestBed } from '@angular/core/testing';

import { CrearProductoService } from './crear-producto.service';

describe('CrearProductoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CrearProductoService = TestBed.get(CrearProductoService);
    expect(service).toBeTruthy();
  });
});
