import { join } from 'path';
import { readFile } from 'fs/promises';
import { NextResponse } from 'next/server';
import matter from 'gray-matter';

type Params = { projectId: string };

export async function GET(
  request: Request,
  context: { params: Params }
) {
  try {
    const { searchParams } = new URL(request.url);
    const locale = searchParams.get('locale') || 'zh';
    const params = await Promise.resolve(context.params);
    const { projectId } = params;

    if (!projectId) {
      return NextResponse.json(
        { error: 'Invalid project ID parameter' },
        { status: 400 }
      );
    }

    const fullPath = join(
      process.cwd(),
      'content',
      'projects',
      projectId,
      locale,
      `${projectId}.md`
    );

    const fileContent = await readFile(fullPath, 'utf8');
    const { data: frontmatter, content } = matter(fileContent);

    return NextResponse.json({
      frontmatter,
      content
    });
  } catch (error) {
    console.error('Error reading project file:', error);
    return NextResponse.json(
      { error: 'Project not found' },
      { status: 404 }
    );
  }
} 