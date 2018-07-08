import { Component, OnInit, Input } from '@angular/core';
import { INavBarItemProps } from '../../navBarItems';

@Component({
  selector: 'app-navgrid-item',
  templateUrl: './navgrid-item.component.html',
  styleUrls: ['./navgrid-item.component.css']
})
export class NavgridItemComponent implements OnInit {
  @Input() item: INavBarItemProps;

  constructor() { }

  ngOnInit() {
  }
}