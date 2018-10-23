import { Session, State } from '@/types';

export const state: State = {
  sessions: [
    {
      id: 1,
      title: 'Intro to Web Components w/ lit-html',
      description:
        'Shallow dive in the kiddie pool will get you quite far w/ lit-html and lit-template',
      speaker: 'Eldridge Cleaver',
      datetime: new Date('2001-01-01 12:00:00 PM'),
      tags: ['Web Components', 'Polymer', 'PWA']
    } as Session,
    {
      id: 2,
      title: 'VUE 102',
      description: 'Troubles in the rear Vue',
      speaker: 'Fred Hampton',
      datetime: new Date('2001-02-01 09:00:00 AM'),
      tags: ['VueJS', 'PWA']
    } as Session
  ]
};
