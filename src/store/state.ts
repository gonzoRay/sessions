import { AppState } from '@/types';

export const state: AppState = {
  appName: 'tech.:<b>sessions</b>',
  showAddModal: false,
  showConfirmModal: false,
  isLoading: true,
  snackbar: {
    showSnackbar: false,
    snackbarText: ''
  },
  sessions: [],
  allTags: [],
  currentUser: null
};

export default state;
