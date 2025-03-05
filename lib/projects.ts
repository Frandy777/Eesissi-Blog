import { join } from 'path';
import { readdir, readFile } from 'fs/promises';
import matter from 'gray-matter';

export interface ProjectCard {
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

export interface ProjectContent {
  frontmatter: {
    title: string;
    description: string;
    order: number;
    [key: string]: unknown;
  };
  content: string;
}

/**
 * 获取所有项目的列表数据
 */
export async function getAllProjects(): Promise<ProjectCard[]> {
  try {
    const projectsDir = join(process.cwd(), 'content', 'projects');
    const projectFolders = await readdir(projectsDir);
    
    // 过滤掉系统文件和非项目文件夹
    const validFolders = projectFolders.filter(folder => 
      !['en', 'zh', '.DS_Store', 'index.md'].includes(folder) && 
      folder.startsWith('project') &&
      !folder.startsWith('.')
    );
    
    const projects: ProjectCard[] = [];

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
        console.error(`Error processing project ${folder}:`, error);
      }
    }

    // 按 order 排序
    projects.sort((a, b) => a.order - b.order);

    return projects;
  } catch (error) {
    console.error('Error reading projects:', error);
    throw new Error('Failed to fetch projects');
  }
}

/**
 * 获取特定项目的详细内容
 */
export async function getProjectById(projectId: string, locale: string): Promise<ProjectContent> {
  try {
    const fullPath = join(
      process.cwd(),
      'content',
      'projects',
      projectId,
      locale,
      `${projectId}.md`
    );

    const fileContent = await readFile(fullPath, 'utf8');
    const { data, content } = matter(fileContent);

    return {
      frontmatter: data as ProjectContent['frontmatter'],
      content
    };
  } catch (error) {
    console.error(`Error reading project ${projectId}:`, error);
    throw new Error(`Project not found: ${projectId}`);
  }
}

/**
 * 获取所有项目ID，用于静态路径生成
 */
export async function getAllProjectIds(): Promise<string[]> {
  try {
    const projectsDir = join(process.cwd(), 'content', 'projects');
    const projectFolders = await readdir(projectsDir);
    
    // 过滤掉系统文件和非项目文件夹
    return projectFolders.filter(folder => 
      !['en', 'zh', '.DS_Store', 'index.md'].includes(folder) && 
      folder.startsWith('project') &&
      !folder.startsWith('.')
    );
  } catch (error) {
    console.error('Error reading project IDs:', error);
    throw new Error('Failed to fetch project IDs');
  }
} 