// Store
export interface AppState {
  addSessionModalVisible: boolean;
  sessions: Session[];
}

// Models
export interface Session {
  id: number;
  title: string;
  description: string;
  speaker: string;
  datetime: string;
  tags?: string[];
  isFavorite?: boolean;
}
