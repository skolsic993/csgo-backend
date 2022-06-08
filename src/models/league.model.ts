import { Serie } from './serie.model';

export interface League {
  id: number;
  name: string;
  image_url: string;
  series: Serie;
  url?: string;
}
