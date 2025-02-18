import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeHighlight from 'rehype-highlight';
import rehypeStringify from 'rehype-stringify';
import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';
import matter from 'gray-matter';

export interface PostMeta {
  title: string;
  date: string;
  description: string;
  author: string;
  slug: string;
  cover?: string;
  tags?: string[];
  status?: string;
}

export interface Post extends PostMeta {
  content: string;
}

export async function getPostBySlug(slug: string, locale: string): Promise<Post | null> {
  try {
    const fullPath = join(process.cwd(), 'content', 'projects', locale, `${slug}.md`);
    const fileContents = readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    const result = await unified()
      .use(remarkParse)
      .use(remarkGfm)
      .use(remarkRehype)
      .use(rehypeHighlight)
      .use(rehypeStringify)
      .process(content);

    return {
      title: data.title,
      date: data.date,
      description: data.description,
      author: data.author,
      slug,
      cover: data.cover,
      tags: data.tags,
      status: data.status,
      content: result.toString(),
    };
  } catch (error) {
    console.error(`Error getting post ${slug}:`, error);
    return null;
  }
}

export async function getAllPosts(locale: string): Promise<PostMeta[]> {
  try {
    const postsDirectory = join(process.cwd(), 'content', 'projects', locale);
    const filenames = readdirSync(postsDirectory);
    
    const posts = filenames
      .filter((filename) => filename.endsWith('.md'))
      .map((filename) => {
        const fullPath = join(postsDirectory, filename);
        const fileContents = readFileSync(fullPath, 'utf8');
        const { data } = matter(fileContents);
        
        return {
          title: data.title,
          date: data.date,
          description: data.description,
          author: data.author,
          slug: filename.replace(/\.md$/, ''),
          cover: data.cover,
          tags: data.tags,
          status: data.status,
        };
      })
      .sort((a, b) => (new Date(b.date).getTime() - new Date(a.date).getTime()));

    return posts;
  } catch (error) {
    console.error('Error getting all posts:', error);
    return [];
  }
} 
