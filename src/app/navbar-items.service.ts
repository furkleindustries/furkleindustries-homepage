import { Injectable } from '@angular/core';
import { navbarItems } from './navBarItems';

@Injectable({
  providedIn: 'root'
})
export class NavbarItemsService {

  constructor() { }

  getNavbarItems() {
    return navbarItems;
  }
}
