// Model de la card dentro del frontend

export interface Card {
  _id?: string;
  user: string;
  title: string;
  description: string;
  status: 'to-do' | 'doing' | 'done';
}