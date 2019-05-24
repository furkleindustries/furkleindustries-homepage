export interface IProjectListItemProps {
  title: string;
  href: string;
  synopsis: string;
}

export const projects = [
  {
    href: '/projects/helloX',
    title: 'Hello X',
    synopsis: 'Hello X is a multimedia project situated in Tromsø, Norway, ' +
              'focused on our changing climate, culture, world, and ' +
              'the people who will inherit them a lifetime from now. I ' +
              'provided full-stack web development and technical expertise to ' +
              'create a rich experience and bring the client\'s vision to ' +
              'life.',
  },

  {
    href: '/projects/porpentine',
    title: 'Porpentine Charity Heartscape',
    synopsis: 'I have collaborated multiple times with the award-winning ' +
              'multimedia artist Porpentine Charity Heartscape, including ' +
              'programming assistance for an episodic multimedia work, ' +
              'server code for multiple online-only installation pieces, ' +
              'and build scripting and publishing software assistance for ' +
              'one of the most critically acclaimed collections of IF ever ' +
              'made.',
  },

  {
    href: '/projects/cat-manning',
    title: 'Cat Manning',
    synopsis: 'Cat Manning, a writer and narrative designer, made a game ' +
              'about memory, love, and what we choose to leave behind. ' +
              'I provided assistance with coding and styling, and I ' +
              'designed a complex animation system in order to produce a ' +
              'mesmerizing and affecting visual effect.',
  },
];
