import {NewsItem} from './NewsItem';

export interface NewsState {
  items: NewsItem[];
  loading: boolean;
  error: string | null;
}
