// Store
export interface AppState {
  addSessionModalVisible: boolean;
  isLoading: boolean;
  snackbar: Snackbar;
  sessions: any;
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

export interface Snackbar {
  showSnackbar: boolean;
  snackbarText: string;
}
