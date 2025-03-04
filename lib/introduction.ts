import { join } from 'path';
import { readFile } from 'fs/promises';
import matter from 'gray-matter';

/**
 * 从文件系统获取个人简介内容
 * @param locale 语言代码
 * @returns 个人简介内容
 */
export async function getIntroductionContent(locale: string): Promise<string> {
  try {
    const fullPath = join(process.cwd(), 'content', 'introduction', locale, 'introduction.md');
    const fileContent = await readFile(fullPath, 'utf8');
    const { content } = matter(fileContent);
    return content;
  } catch (error) {
    console.error('Error reading introduction file:', error);
    throw new Error('Introduction not found');
  }
} 