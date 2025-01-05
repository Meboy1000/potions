import { Noun } from './noun';

export interface Belief {
  id?: string;
  subject: Noun;
  related_to?: Noun;
  concept: string;
  name: string;
  description: string;
  trust: number;
}