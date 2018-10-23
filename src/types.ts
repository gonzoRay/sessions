// Store
export interface State {
  sessions: Session[];
}

// Models
export interface Session {
  id: number;
  title: string;
  description: string;
  speaker: string;
  datetime: Date;
  tags: string[];
}
