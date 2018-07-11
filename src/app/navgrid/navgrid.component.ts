import { Component, OnInit } from '@angular/core';
import { INavBarItemProps } from '../navbarItems';
import { NavbarItemsService } from '../navbar-items.service';

@Component({
  selector: 'app-navgrid',
  templateUrl: './navgrid.component.html',
  styleUrls: ['./navgrid.component.scss']
})
export class NavgridComponent implements OnInit {
  navgridItems: Array<INavBarItemProps>;

  constructor(private navbarItemsService: NavbarItemsService) { }

  ngOnInit() {
    this.navgridItems = this.getNavbarItems();
  }

  getNavbarItems() {
    return this.navbarItemsService.getNavbarItems();
  }
}
