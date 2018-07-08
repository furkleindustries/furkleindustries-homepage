import { Component, Input, OnInit } from '@angular/core';
import { INavBarItemProps } from '../navBarItems';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  constructor() { }

  ngOnInit() {
  }

}
