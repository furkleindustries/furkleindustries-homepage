import { Component, OnInit, Input } from '@angular/core';
import { NavbarItemComponent, } from '../navbar-item/navbar-item.component';

export interface INavBarItemProps {
  href: string,
  text: string,
}

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  @Input() items: Array<INavBarItemProps>;

  constructor() { }

  ngOnInit() {
  }

}
