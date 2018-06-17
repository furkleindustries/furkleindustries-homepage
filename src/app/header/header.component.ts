import { Component, Input, OnInit } from '@angular/core';
import { INavBarItemProps } from '../navbar/navbar.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() navbarItems: Array<INavBarItemProps>;

  constructor() { }

  ngOnInit() {
  }

}
