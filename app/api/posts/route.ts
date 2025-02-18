import { readdir, readFile } from 'fs/promises';
import { join } from 'path';
import matter from 'gray-matter';
import { NextResponse } from 'next/server';
import type { PostMeta } from '@/lib/markdown';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const locale = searchParams.get('locale') || 'zh';
    const type = searchParams.get('type') || 'projects';

    const postsDirectory = join(process.cwd(), 'content', type, locale);
    const filenames = await readdir(postsDirectory);
    
    const posts = await Promise.all(
      filenames
        .filter((filename) => filename.endsWith('.md'))
        .map(async (filename) => {
          const fullPath = join(postsDirectory, filename);
          const fileContents = await readFile(fullPath, 'utf8');
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
          } as PostMeta;
        })
    );

    // 按日期排序
    posts.sort((a, b) => (new Date(b.date).getTime() - new Date(a.date).getTime()));

    return NextResponse.json(posts);
  } catch (error) {
    console.error('Error getting all posts:', error);
    return NextResponse.json(
      { error: 'Failed to get posts' },
      { status: 500 }
    );
  }
} 