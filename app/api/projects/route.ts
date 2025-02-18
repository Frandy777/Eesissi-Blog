import { join } from 'path';
import { readdir, readFile } from 'fs/promises';
import { NextResponse } from 'next/server';
import matter from 'gray-matter';

interface ProjectData {
  id: string;
  title: {
    zh: string;
    en: string;
  };
  description: {
    zh: string;
    en: string;
  };
  order: number;
}

export async function GET() {
  try {
    const projectsDir = join(process.cwd(), 'content', 'projects');
    const projectFolders = await readdir(projectsDir);
    
    // 过滤掉系统文件和非项目文件夹
    const validFolders = projectFolders.filter(folder => 
      !['en', 'zh', '.DS_Store', 'index.md'].includes(folder) && 
      folder.startsWith('project') &&
      !folder.startsWith('.')
    );
    
    const projects: ProjectData[] = [];

    for (const folder of validFolders) {
      try {
        const zhPath = join(projectsDir, folder, 'zh', `${folder}.md`);
        const enPath = join(projectsDir, folder, 'en', `${folder}.md`);

        const [zhContent, enContent] = await Promise.all([
          readFile(zhPath, 'utf8'),
          readFile(enPath, 'utf8')
        ]);

        const zhFrontmatter = matter(zhContent).data;
        const enFrontmatter = matter(enContent).data;

        projects.push({
          id: folder,
          title: {
            zh: zhFrontmatter.title,
            en: enFrontmatter.title
          },
          description: {
            zh: zhFrontmatter.description,
            en: enFrontmatter.description
          },
          order: zhFrontmatter.order || parseInt(folder.replace('project', ''))
        });
      } catch (error) {
        // 只记录真正的项目文件夹的错误
        console.error(`Error processing project ${folder}:`, error);
      }
    }

    // 按 order 排序
    projects.sort((a, b) => a.order - b.order);

    return NextResponse.json(projects);
  } catch (error) {
    console.error('Error reading projects:', error);
    return NextResponse.json(
      { error: 'Failed to fetch projects' },
      { status: 500 }
    );
  }
} 