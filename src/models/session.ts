export interface Session {
  id: number;
  title: string;
  description: string;
  speaker: string;
  datetime: Date;
  technology: string;
  tags: string[];
}
