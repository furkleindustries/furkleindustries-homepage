import { Component, OnInit, Input, Sanitizer } from '@angular/core';
import { INavBarItemProps } from '../../navbarItems';

@Component({
  selector: 'app-navgrid-item',
  templateUrl: './navgrid-item.component.html',
  styleUrls: ['./navgrid-item.component.scss']
})
export class NavgridItemComponent implements OnInit {
  @Input() item: INavBarItemProps;

  constructor() { }

  ngOnInit() { }
}
