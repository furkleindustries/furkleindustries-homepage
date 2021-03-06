import { Component, OnInit, Input } from '@angular/core';
import { INavBarItemProps } from '../../navbarItems';

@Component({
  selector: 'app-navbar-item',
  templateUrl: './navbar-item.component.html',
  styleUrls: ['./navbar-item.component.scss']
})
export class NavbarItemComponent implements OnInit {
  @Input() item: INavBarItemProps;

  constructor() { }

  ngOnInit() {
  }

}
