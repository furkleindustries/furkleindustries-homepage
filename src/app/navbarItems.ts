export interface INavBarItemProps {
  href: string;
  text: string;
  description?: string;
  root?: boolean;
}

export const navbarItems: Array<INavBarItemProps> = [
  {
    href: '/',
    text: 'Furkle Industries',
    root: true,
  },

  {
    href: '/about',
    text: 'About',
  },

  {
    href: '/projects',
    text: 'Projects',
  },

  {
    href: '/resources',
    text: 'Resources',
  },
];