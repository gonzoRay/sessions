// Store
export interface AppState {
  appName: string;
  showAddModal: boolean;
  showConfirmModal: boolean;
  isLoading: boolean;
  snackbar: Snackbar;
  sessions: Session[];
  allTags: Tag[];
  currentUser: firebase.User | null;
}

// Models
export interface Session {
  id: string;
  title: string;
  description: string;
  speaker: string;
  datetime: string;
  tags?: string[];
  isFavorite?: boolean;
}

export interface Tag {
  tagName: string;
}

export interface Snackbar {
  showSnackbar: boolean;
  snackbarText: string;
}
