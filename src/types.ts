// Store
export interface AppState {
  addSessionModalVisible: boolean;
  isLoading: boolean;
  snackbar: Snackbar;
  sessions: Session[];
  allTags: Tag[];
  sessionsDemo: any;
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
