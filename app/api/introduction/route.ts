import { join } from 'path';
import { readFile } from 'fs/promises';
import { NextResponse } from 'next/server';
import matter from 'gray-matter';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const locale = searchParams.get('locale') || 'zh';

    const fullPath = join(process.cwd(), 'content', 'introduction', locale, 'introduction.md');
    const fileContent = await readFile(fullPath, 'utf8');
    const { content } = matter(fileContent);

    return NextResponse.json({
      content
    });
  } catch (error) {
    console.error('Error reading introduction file:', error);
    return NextResponse.json(
      { error: 'Introduction not found' },
      { status: 404 }
    );
  }
} 