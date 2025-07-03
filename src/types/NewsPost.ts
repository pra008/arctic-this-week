export interface NewsPost {
  _id: string;
  _created: number;
  _modified: number;
  title: string;
  title_slug: string;
  category: string;
  published?: boolean;
  excerpt?: string;
  content?: string;
  image?: {
    path: string;
  };
  tags?: string[] | null;
  image_credit?: string;
  _by?: string;
  _mby?: string;
}
