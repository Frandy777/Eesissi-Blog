import { join } from 'path';
import { readFile } from 'fs/promises';
import { NextResponse } from 'next/server';
import matter from 'gray-matter';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const locale = searchParams.get('locale') || 'zh';

    const fullPath = join(process.cwd(), 'content', 'members', locale, 'members.md');
    const fileContent = await readFile(fullPath, 'utf8');
    const { content } = matter(fileContent);

    return NextResponse.json({
      content
    });
  } catch (error) {
    console.error('Error reading members file:', error);
    return NextResponse.json(
      { error: 'Members not found' },
      { status: 404 }
    );
  }
} 