export interface NewsItem {
  id: string;
  title: string;
  title_slug: string;
  category: string;
  excerpt: string;
  content: string;
  imageUrl: string;
  imageCredit: string;
  tags: string[];
  published: boolean;
  created: number;
  modified: number;
  createdBy: string;
  modifiedBy: string;
}
