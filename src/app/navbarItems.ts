export interface INavBarItemProps {
  href: string;
  text: string;
  description?: string;
  imgId?: string;
  root?: boolean;
}

export const navbarItems: Array<INavBarItemProps> = [
  {
    href: '/',
    text: 'Furkle Industries',
    description: 'Unused',
    root: true,
  },

  {
    href: '/about',
    text: 'About',
    description: 'What\'s all this about?',
    imgId: 'Cloudy',
  },

  {
    href: '/projects',
    text: 'Projects',
    description: 'A selection of recent projects.',
    imgId: 'Highway',
  },

  /*{
    href: '/resources',
    text: 'Resources',
    description: 'Links to Furkle Industries repositories and services.',
    imgId: 'Cityscape',
  },*/
];
