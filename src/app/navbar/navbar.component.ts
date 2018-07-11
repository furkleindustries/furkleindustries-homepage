import { Component, OnInit, Input } from '@angular/core';
import { NavbarItemComponent } from '../navbar/navbar-item/navbar-item.component';
import { NavbarItemsService } from '../navbar-items.service';
import { INavBarItemProps } from '../navbarItems';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  navbarItems: Array<INavBarItemProps>;

  constructor(private navbarItemsService: NavbarItemsService) { }

  ngOnInit() {
    this.navbarItems = this.getNavbarItems();
  }

  getNavbarItems() {
    return this.navbarItemsService.getNavbarItems();
  }
}
