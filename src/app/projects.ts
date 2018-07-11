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
              'focused on our changing climate, culture, and world, and ' +
              'the people who will inherit them a lifetime from now. Furkle ' +
              'Industries provided expertise and lead programming to ' +
              'create a rich experience and bring the client\'s vision to ' +
              'life.',
  },

  {
    href: '/projects/human-errors',
    title: 'Human Errors',
    synopsis: 'A great idea requires thinking outside the box. When ' +
              'Katherine Morayati decided to write a story whose ' +
              'presentation mimics an error tracker, she knew she wanted ' +
              'to use Twine, but she also knew she\'d need custom code. ' +
              'Furkle Industries provided web knowledge and code assistance.',
  },

  {
    href: '/projects/what-isnt-saved',
    title: 'What Isn\'t Saved (will be lost)',
    synopsis: 'Cat Manning, a writer and narrative designer, made a game ' +
              'about memory, love, and what we choose to leave behind. ' +
              'Furkle Industries provided assistance with coding and ' +
              'styling, as well as designing an entirely new system based ' +
              'on the scientific concept of state machines, in order to ' +
              'produce a fitting and sublime visual effect.',
  },

  {
    href: '/projects/midnight-museum-rat-shrine',
    title: 'Midnight Museum/Rat Shrine',
    synopsis: 'Midnight Museum and Rat Shrine are interactive art ' +
              'installations created by prolific digital artist Porpentine ' +
              'Charity Heartscape. Available only for short periods of time every ' +
              'day, they are intimate experiences made more so by their ' +
              'frequent absence. Furkle Industries created custom back-end ' +
              'code to allow the exhibits to function on a chronological ' +
              'level as well as a fictional level.',
  },
];
