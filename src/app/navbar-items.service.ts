import { Injectable } from '@angular/core';
import { navbarItems } from './navbarItems';

@Injectable({
  providedIn: 'root'
})
export class NavbarItemsService {

  constructor() { }

  getNavbarItems() {
    return navbarItems;
  }
}
