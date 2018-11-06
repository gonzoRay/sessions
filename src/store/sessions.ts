import { AppState, Session } from '@/types';
import isBefore from 'date-fns/is_before';
import { GetterTree, MutationTree } from 'vuex';

export const state: AppState = {
  addSessionModalVisible: false,
  sessions: [
    {
      id: 1,
      title: 'Intro to Web Components w/ lit',
      description:
        'Shallow dive in the kiddie pool will get you quite far w/ lit-html and lit-template',
      speaker: 'Eldridge Cleaver',
      datetime: '2019-01-01 12:00:00 PM',
      tags: ['Web Components', 'Polymer', 'PWA'],
      isFavorite: false
    } as Session,
    {
      id: 2,
      title: 'VUE 102',
      description: `Troubles in the rear Vue after you switch to Vue.JS.
        Mr. Hampton will show you how to make the most of your web experience.`,
      speaker: 'Fred Hampton',
      datetime: '2018-02-01 09:00:00 AM',
      tags: ['VueJS', 'PWA'],
      isFavorite: false
    } as Session,
    {
      id: 3,
      title: 'Angular Elements Unleashed',
      description: `Using Angular elements to do some really rad things like create bonafide Web Components.
        And then share them w/ your friends.`,
      speaker: 'Angela Davis',
      datetime: '2019-06-01 09:00:00 AM',
      tags: ['Angular', 'Web Components'],
      isFavorite: false
    } as Session,
    {
      id: 4,
      title: 'Intro to React',
      description:
        'React is a small view library. Let us take an initial look at this ever popular javascript library.',
      speaker: 'Assata Shakur',
      datetime: '2019-04-01 09:00:00 AM',
      tags: ['Frontend', 'ES2015', 'React'],
      isFavorite: false
    } as Session,
    {
      id: 5,
      title: 'Advanced React w/ Redux',
      description:
        'Take a deeper dive w/ React by implementing a state pattern known as Redux.',
      speaker: 'Paul Robeson',
      datetime: '2019-03-15 09:00:00 AM',
      tags: ['React', 'Redux'],
      isFavorite: true
    } as Session
  ]
};

export const getters: GetterTree<AppState, any> = {
  getSessionById: (state: AppState) => (id: number): Session | undefined =>
    state.sessions.find(s => s.id === id),
  upcoming: state =>
    state.sessions.filter(session =>
      isBefore(new Date(), new Date(session.datetime))
    ),
  past: state =>
    state.sessions.filter(session => isBefore(session.datetime, new Date())),
  favorites: state => state.sessions.filter(session => session.isFavorite),
  addSessionModalVisible: state => state.addSessionModalVisible
};

export const mutations: MutationTree<AppState> = {
  addSession(state, newSession) {
    const sessionCopy = Object.assign({}, newSession);
    state.sessions.push(sessionCopy);
  },
  toggleFavorite(state, session) {
    session.isFavorite = !session.isFavorite;
  },
  showAddSessionModal(state) {
    state.addSessionModalVisible = true;
  },
  hideAddSessionModal(state) {
    state.addSessionModalVisible = false;
  }
};
