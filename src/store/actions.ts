import { AppState, Session } from '@/types';
import { ActionTree } from 'vuex';

import { sessionCollection, tagCollection } from './db';

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
  },
  toggleConfirmModal({ commit }) {
    commit('toggleConfirmModal');
  }
};

export default actions;
