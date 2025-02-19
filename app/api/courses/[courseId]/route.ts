import { NextResponse } from 'next/server';
import { join } from 'path';
import { readFile } from 'fs/promises';
import matter from 'gray-matter';

export async function GET(
  request: Request
) {
  try {
    const url = new URL(request.url);
    const locale = url.searchParams.get('locale') || 'zh';
    const courseId = url.pathname.split('/').pop();

    if (!courseId) {
      return NextResponse.json(
        { error: 'Invalid course ID parameter' },
        { status: 400 }
      );
    }

    const fullPath = join(
      process.cwd(),
      'content',
      'course',
      courseId,
      locale,
      `${courseId}.md`
    );

    const fileContent = await readFile(fullPath, 'utf8');
    const { content } = matter(fileContent);

    return NextResponse.json({ content });
  } catch (error) {
    console.error('Error reading course content:', error);
    return NextResponse.json(
      { error: 'Failed to fetch course content' },
      { status: 500 }
    );
  }
} 