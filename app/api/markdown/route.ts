import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeHighlight from 'rehype-highlight';
import rehypeStringify from 'rehype-stringify';
import { readFile } from 'fs/promises';
import { join } from 'path';
import matter from 'gray-matter';
import { NextResponse } from 'next/server';

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

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');
    const locale = searchParams.get('locale') || 'zh';
    const type = searchParams.get('type') || 'projects';

    if (!slug) {
      return NextResponse.json(
        { error: 'Slug parameter is required' },
        { status: 400 }
      );
    }

    const fullPath = join(process.cwd(), 'content', type, locale, `${slug}.md`);
    const fileContents = await readFile(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    const result = await unified()
      .use(remarkParse)
      .use(remarkGfm)
      .use(remarkRehype)
      .use(rehypeHighlight)
      .use(rehypeStringify)
      .process(content);

    const post: Post = {
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

    return NextResponse.json(post);
  } catch (error) {
    console.error(`Error processing markdown:`, error);
    return NextResponse.json(
      { error: 'Failed to process markdown' },
      { status: 500 }
    );
  }
} 