// utils/mapCockpitToNewsItem.ts
import { NewsPost } from '../types/NewsPost';
import { NewsItem } from '../types/NewsItem';

export const mapCockpitToNewsItem = (
  post: NewsPost,
  baseUrl: string
): NewsItem => {
  return {
    id: post._id,
    title: post.title,
    title_slug: post.title_slug ?? (post.title?.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9\-]/g, '') ?? ''),
    category: post.category?.trim() ?? '',
    excerpt: post.excerpt ?? '',
    content: post.content ?? '',
    imageUrl: post.image?.path ? `${baseUrl}${post.image.path}` : '',
    imageCredit: post.image_credit ?? '',
    tags: Array.isArray(post.tags) ? post.tags : [],
    published: post.published ?? false,
    created: post._created,
    modified: post._modified,
    createdBy: post._by ?? '',
    modifiedBy: post._mby ?? '',
  };
};
