export interface NewsItem {
    id: string;
    title: string;
    excerpt?: string;
    date?: string;
    [key: string]: any;
  }
  
  export interface NewsState {
    items: NewsItem[];
  }