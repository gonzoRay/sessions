import { AppState, Session } from '@/types';
import isBefore from 'date-fns/is_before';
import { GetterTree } from 'vuex';

export const getters: GetterTree<AppState, any> = {
  appName: state => state.appName,
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
  mySessions: state => {
    const currentUserId = (state.currentUser as firebase.User).uid;

    return state.sessions.filter(s => s.createdByUid === currentUserId);
  },
  favorites: state => state.sessions.filter(session => session.isFavorite),
  showAddModal: state => state.showAddModal,
  showConfirmModal: state => state.showConfirmModal,
  isLoading: state => state.isLoading,
  showSnackbar: state => state.snackbar.showSnackbar,
  snackbarText: state => state.snackbar.snackbarText,
  allTags: state => state.allTags,
  currentUser: state => state.currentUser
};

export default getters;
