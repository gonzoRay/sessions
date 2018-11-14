import { AppState, Session } from '@/types';
import isBefore from 'date-fns/is_before';
import { ActionTree, GetterTree, MutationTree } from 'vuex';

import { db, firebase } from './db';

const sessionCollection = db.collection('sessions');
const tagCollection = db.collection('tags');

firebase.auth().onAuthStateChanged(user => {
  state.currentUser = user;
});

// Create subscription to sessions Firestore collection in Firebase
sessionCollection.onSnapshot(sessionsRef => {
  state.isLoading = true;
  const sessions: Session[] = [];
  sessionsRef.forEach(doc => {
    const session = doc.data();
    session.id = doc.id;
    sessions.push(session as Session);
  });
  state.sessions = sessions;
  state.isLoading = false;
});

tagCollection.onSnapshot(tagRef => {
  state.isLoading = true;
  state.allTags = [];
  tagRef.forEach(tagDoc => {
    state.allTags.push(tagDoc.data().name);
  });
  state.isLoading = false;
});

export const state: AppState = {
  addSessionModalVisible: false,
  isLoading: true,
  snackbar: {
    showSnackbar: false,
    snackbarText: ''
  },
  sessions: [],
  allTags: [],
  currentUser: null
};

export const getters: GetterTree<AppState, any> = {
  getSessionById: (state: AppState) => (id: string): Session | undefined =>
    state.sessions.find(s => s.id === id),
  getSessionsByTagName: (state: AppState) => (tagName: string): Session[] => {
    return state.sessions.filter(s =>
      s.tags!.some(t => t.toLowerCase() === tagName.toLowerCase())
    );
  },
  upcoming: state =>
    state.sessions.filter(session =>
      isBefore(new Date(), new Date(session.datetime))
    ),
  past: state =>
    state.sessions.filter(session => isBefore(session.datetime, new Date())),
  favorites: state => state.sessions.filter(session => session.isFavorite),
  addSessionModalVisible: state => state.addSessionModalVisible,
  isLoading: state => state.isLoading,
  showSnackbar: state => state.snackbar.showSnackbar,
  snackbarText: state => state.snackbar.snackbarText,
  allTags: state => state.allTags,
  currentUser: state => state.currentUser
};

export const mutations: MutationTree<AppState> = {
  loadSessions(state, sessions: Session[]) {
    state.isLoading = false;
    state.sessions = sessions;
  },
  toggleFavorite(state, session) {
    session.isFavorite = !session.isFavorite;
  },
  showAddSessionModal(state) {
    state.addSessionModalVisible = true;
  },
  hideAddSessionModal(state) {
    state.addSessionModalVisible = false;
  },
  showSnackbarAlert(state, text) {
    state.snackbar.snackbarText = text;
    state.snackbar.showSnackbar = true;
  }
};

export const actions: ActionTree<AppState, any> = {
  addSessionAsync(state, newSession: Session) {
    sessionCollection.add(newSession).then(() => {
      const newTags = newSession.tags || [];
      newTags.forEach(tag => {
        const tagQuery = tagCollection.where('name', '==', tag).get();
        tagQuery.then(result => {
          if (result.empty) {
            tagCollection.add({ name: tag });
          }
        });
      });
    });
  },
  toggleFavoriteAsync(state, session: Session) {
    const docRef = sessionCollection.doc(session.id);
    docRef.update({ isFavorite: !session.isFavorite }).then();
  },
  deleteSessionAsync({ commit }, id: string) {
    const docRef = sessionCollection.doc(id);
    docRef.delete().then();
  },
  showAlert({ commit }, text: string) {
    commit('showSnackbarAlert', text);
  }
};
