import { AppState, Session } from '@/types';
import { ActionTree } from 'vuex';

import { sessionCollection, tagCollection, userCollection } from './db';

export const actions: ActionTree<AppState, any> = {
  addSessionAsync(state, newSession: Session) {
    newSession.createdByUid = (state.state.currentUser as firebase.User).uid;
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
  toggleFavoriteAsync({ commit }, session: Session) {
    const docRef = sessionCollection.doc(session.id);
    docRef.update({ isFavorite: !session.isFavorite }).then();
  },
  deleteSessionAsync({ commit }, id: string) {
    const docRef = sessionCollection.doc(id);
    docRef.delete().then();
  },
  registerUserLogin({ commit }, user: firebase.User) {
    const userRef = userCollection.where('uid', '==', user.uid).get();

    userRef.then(result => {
      if (!result.empty) {
        commit(
          'showSnackbarAlert',
          `Successfully signed in: ${user.displayName}`
        );
        return;
      }
      userCollection
        .add({
          uid: user.uid,
          email: user.email,
          name: user.displayName
        })
        .then(() =>
          commit(
            'showSnackbarAlert',
            `Successfully registered: ${user.displayName}`
          )
        );
    });
  },
  showAlert({ commit }, text: string) {
    commit('showSnackbarAlert', text);
  },
  toggleConfirmModal({ commit }) {
    commit('toggleConfirmModal');
  }
};

export default actions;
