import { TestBed, inject } from '@angular/core/testing';

import { NavbarItemsService } from './navbar-items.service';

describe('NavBarItemsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NavbarItemsService]
    });
  });

  it('should be created', inject([NavbarItemsService], (service: NavbarItemsService) => {
    expect(service).toBeTruthy();
  }));
});
