import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';

interface CourseData {
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

export async function GET() {
  try {
    // 获取课程目录的绝对路径
    const coursesDir = path.join(process.cwd(), 'content', 'course');
    
    // 读取课程目录
    const courseFolders = await fs.readdir(coursesDir);
    
    // 过滤掉非目录文件（如 .DS_Store）
    const validFolders = (await Promise.all(
      courseFolders.map(async (folder) => {
        const stat = await fs.stat(path.join(coursesDir, folder));
        return stat.isDirectory() ? folder : null;
      })
    )).filter((folder): folder is string => folder !== null);

    // 处理每个课程文件夹
    const courses = await Promise.all(
      validFolders.map(async (folder): Promise<CourseData | null> => {
        try {
          const id = folder;
          const zhPath = path.join(coursesDir, folder, 'zh', `${folder}.md`);
          const enPath = path.join(coursesDir, folder, 'en', `${folder}.md`);

          // 读取中英文内容
          const [zhContent, enContent] = await Promise.all([
            fs.readFile(zhPath, 'utf8'),
            fs.readFile(enPath, 'utf8'),
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
    const validCourses = courses.filter((course): course is CourseData => course !== null);

    return NextResponse.json(validCourses);
  } catch (error) {
    console.error('Error reading courses:', error);
    return NextResponse.json(
      { error: 'Failed to fetch courses' },
      { status: 500 }
    );
  }
} 