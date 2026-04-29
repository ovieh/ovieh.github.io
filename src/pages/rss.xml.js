import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const posts = await getCollection('posts', ({ data }) => data.draft !== true && data.archived !== true);
  
  return rss({
    title: 'Ovieh Mosley | Brewing Up Code',
    description: 'Personal blog of Ovieh Mosley, exploring JavaScript, React, and modern web architecture.',
    site: context.site,
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: post.data.description || post.body.substring(0, 160) + '...',
      link: `/post/${post.slug}/`,
    })),
  });
}
