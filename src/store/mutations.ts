import { AppState, Session } from '@/types';
import { MutationTree } from 'vuex';

export const mutations: MutationTree<AppState> = {
  loadSessions(state, sessions: Session[]) {
    state.isLoading = false;
    state.sessions = sessions;
  },
  showAddSessionModal(state) {
    state.showAddModal = true;
  },
  hideAddSessionModal(state) {
    state.showAddModal = false;
  },
  toggleConfirmModal(state) {
    state.showConfirmModal = !state.showConfirmModal;
  },
  showSnackbarAlert(state, text) {
    state.snackbar.snackbarText = text;
    state.snackbar.showSnackbar = true;
  }
};

export default mutations;
