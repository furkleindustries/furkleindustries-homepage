import { Component } from '@angular/core';
import { INavBarItemProps } from './navbar/navbar.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  navbarItems: Array<INavBarItemProps> = [
    {
      href: '/',
      text: 'Furkle Industries',
    },

    {
      href: '/about',
      text: 'About',
    },

    {
      href: '/user-stories',
      text: 'User Stories',
    },

    {
      href: '/resources',
      text: 'Resources',
    },
  ];
}
