import { join } from 'path';
import { readdir, readFile, stat } from 'fs/promises';
import matter from 'gray-matter';

export interface CourseCard {
  id: string;
  title: {
    zh: string;
    en: string;
  };
  description: {
    zh: string;
    en: string;
  };
  period: string;
}

export interface CourseContent {
  frontmatter: {
    title: string;
    description: string;
    period: string;
    [key: string]: unknown;
  };
  content: string;
}

/**
 * 获取所有课程的列表数据
 */
export async function getAllCourses(): Promise<CourseCard[]> {
  try {
    // 获取课程目录的绝对路径
    const coursesDir = join(process.cwd(), 'content', 'course');
    
    // 读取课程目录
    const courseFolders = await readdir(coursesDir);
    
    // 过滤掉非目录文件（如 .DS_Store）
    const validFolders = (await Promise.all(
      courseFolders.map(async (folder) => {
        const fileStat = await stat(join(coursesDir, folder));
        return fileStat.isDirectory() ? folder : null;
      })
    )).filter((folder): folder is string => folder !== null);

    // 处理每个课程文件夹
    const courses = await Promise.all(
      validFolders.map(async (folder): Promise<CourseCard | null> => {
        try {
          const id = folder;
          const zhPath = join(coursesDir, folder, 'zh', `${folder}.md`);
          const enPath = join(coursesDir, folder, 'en', `${folder}.md`);

          // 读取中英文内容
          const [zhContent, enContent] = await Promise.all([
            readFile(zhPath, 'utf8'),
            readFile(enPath, 'utf8'),
          ]);

          // 解析 frontmatter
          const zhFrontmatter = matter(zhContent).data;
          const enFrontmatter = matter(enContent).data;

          return {
            id,
            title: {
              zh: zhFrontmatter.title || '',
              en: enFrontmatter.title || '',
            },
            description: {
              zh: zhFrontmatter.description || '',
              en: enFrontmatter.description || '',
            },
            period: zhFrontmatter.period || enFrontmatter.period || '',
          };
        } catch (error) {
          console.error(`Error processing course ${folder}:`, error);
          return null;
        }
      })
    );

    // 过滤掉处理失败的课程
    const validCourses = courses.filter((course): course is CourseCard => course !== null);

    return validCourses;
  } catch (error) {
    console.error('Error reading courses:', error);
    throw new Error('Failed to fetch courses');
  }
}

/**
 * 获取特定课程的详细内容
 */
export async function getCourseById(courseId: string, locale: string): Promise<CourseContent> {
  try {
    const fullPath = join(
      process.cwd(),
      'content',
      'course',
      courseId,
      locale,
      `${courseId}.md`
    );

    const fileContent = await readFile(fullPath, 'utf8');
    const { data, content } = matter(fileContent);

    return {
      frontmatter: data as CourseContent['frontmatter'],
      content
    };
  } catch (error) {
    console.error(`Error reading course ${courseId}:`, error);
    throw new Error(`Course not found: ${courseId}`);
  }
}

/**
 * 获取所有课程ID，用于静态路径生成
 */
export async function getAllCourseIds(): Promise<string[]> {
  try {
    const coursesDir = join(process.cwd(), 'content', 'course');
    const courseFolders = await readdir(coursesDir);
    
    // 过滤掉非目录文件
    const validFolders = (await Promise.all(
      courseFolders.map(async (folder) => {
        const fileStat = await stat(join(coursesDir, folder));
        return fileStat.isDirectory() ? folder : null;
      })
    )).filter((folder): folder is string => folder !== null);
    
    return validFolders;
  } catch (error) {
    console.error('Error reading course IDs:', error);
    throw new Error('Failed to fetch course IDs');
  }
} 