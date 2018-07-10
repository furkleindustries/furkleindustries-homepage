export interface INavBarItemProps {
  href:         string;
  text:         string;
  description?: string;
  root?:        boolean;
  imgSrc?:      string;
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
    imgSrc: '/images/clouds-cloudy-cold-167699.jpg',
  },

  {
    href: '/projects',
    text: 'Projects',
    description: 'A selection of recent projects.',
    imgSrc: '/images/dark-guidance-highway-127260.jpg',
  },

  {
    href: '/resources',
    text: 'Resources',
    description: 'Links to Furkle Industries repositories and services.',
    imgSrc: '/images/aerial-architectural-design-architecture-1036657.jpg',
  },
];